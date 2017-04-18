from flask import Flask, jsonify, request, render_template
from python_todo import app, db
from python_todo.models import Task

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/task', methods=['GET'])
def all_tasks():
    return jsonify({'tasks': [ task.to_dict() for task in Task.query.all() ]})

@app.route('/task/<int:task_id>', methods=['GET'])
def get_task(task_id):
    data = Task.query.get_or_404(task_id)
    return jsonify(data.to_dict())

@app.route('/task/', methods=['POST'])
def create_task():
    name = request.get_json().get('name')
    print name
    new_task = Task(name)
    db.session.add(new_task)
    db.session.commit()
    return all_tasks()

@app.route('/task/', methods=['DELETE'])
def delete_task():
    data = Task.query.get_or_404(request.get_json().get('id'))
    db.session.delete(data)
    db.session.commit()
    return all_tasks()

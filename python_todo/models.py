from python_todo import db

class Task(db.Model):
    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    name = db.Column(db.String(64))
    completed = db.Column(db.Integer, default=0)

    def __init__(self, name, completed=0):
        self.name = name
        self.completed = completed


    def to_dict(self):
        return dict(id=self.id, name=self.name, completed=self.completed)

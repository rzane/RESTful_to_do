from python_todo import db

class Task(db.Model):
    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    name = db.Column(db.String(64))

    def __init__(self, name):
        self.name = name

    def to_dict(self):
        return dict(id=self.id, name=self.name)

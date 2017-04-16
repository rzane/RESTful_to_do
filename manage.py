"""
File: manage.py
Purpose: manager for the application
"""

from flask_script import Manager
from python_todo import app

manager = Manager(app)


@manager.shell
def make_shell_context():
    ''' Returns app to the shell '''
    return dict(app=app)


if __name__ == "__main__":
    manager.run()

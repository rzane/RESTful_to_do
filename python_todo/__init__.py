from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object('config.BaseConfiguration')




db = SQLAlchemy(app)

from python_todo import views, models

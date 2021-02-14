import os

from flask import Flask, render_template, redirect, url_for, request, flash
from dotenv import load_dotenv
from flask_json import FlaskJSON
from flask_bootstrap import Bootstrap
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
load_dotenv(verbose=True)

app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Thereem93@localhost/new'
app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_JWT_KEY")
jwt = JWTManager(app)
app.config['JSON_ADD_STATUS'] = False
Bootstrap(app)
bcrypt = Bcrypt(app)
json = FlaskJSON(app)
db = SQLAlchemy(app)



from app import routes, models

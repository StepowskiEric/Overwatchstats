import os
from flask import Flask
from dotenv import load_dotenv
from flask_json import FlaskJSON
from flask_bootstrap import Bootstrap
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='../frontend/build')
load_dotenv(verbose=True)


app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_JWT_KEY")
jwt = JWTManager(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_ADD_STATUS'] = False
Bootstrap(app)
bcrypt = Bcrypt(app)
json = FlaskJSON(app)
db = SQLAlchemy(app)

from app import routes, models

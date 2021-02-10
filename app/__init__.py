from flask import Flask, render_template, redirect, url_for, request, flash
from flask_json import FlaskJSON
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)

app.config['SECRET_KEY'] = 'NotVerySecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Thereem93@localhost/overwatch'
app.config['JSON_ADD_STATUS'] = False
Bootstrap(app)
json = FlaskJSON(app)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


from app import routes, users

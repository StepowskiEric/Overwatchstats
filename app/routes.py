import json

from appdirs import unicode
from flask import render_template, redirect, url_for, flash, app, request, jsonify, abort
from flask_json import json_response
from pipenv.vendor import requests

from app.users import Users, Player
from app import app, db
from app.forms import RegisterForm, LoginForm, PlayerForm
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user


@app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    data = json.loads(request.data)
    email = data['email']

    if Users.query.filter_by(email=email):
        return json_response(status=200)
    else:
        return abort(400)


@app.route('/register', methods=['GET', 'POST'])
def register():
    data = json.loads(request.data)

    if data['email'] or data['password'] is not None:
        new_user = Users(name=data['name'], email=data['email'],
                         password_hash=data['password'], num_of_players=data['numofplayers'])
        new_user.set_password(new_user.password_hash)
        db.session.add(new_user)
        db.session.commit()


@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    form = LoginForm()
    return render_template('dashboard.html', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/creatematch', methods=['GET', 'POST'])
@login_required
def creatematch():
    form = PlayerForm()

    return render_template('creatematch.html', form=form)

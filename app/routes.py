from flask import render_template, redirect, url_for, flash, app, request
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
    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(email=form.email.data).first()
        if user is not None and user.check_password(form.password.data):
            login_user(user, remember=form.remember.data)
            return {'user': current_user.to_json()}, 200
    else:
        return '<h1> error <h1>'




@app.route('/register', methods=['GET', 'POST'])
def register():
    data = request.json()
    if data.get('email') or data.get('password') is not None:
        new_user = Users(name=data.get('name'), email=data.get('email'),
                         password_hash=data.get('password'), num_of_players=data.get('numPlayers'))
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

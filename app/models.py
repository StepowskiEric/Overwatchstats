import login as login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms import ValidationError

from app import db, jwt


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    playersnames = db.relationship('Player', backref='user')

    def __repr__(self):
        return '<User {}>'.format(self.name)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_player(self, players):
        return self.players





class Match(db.Model):
    __tablename__ = 'matches'
    id = db.Column(db.Integer, primary_key=True)
    map = db.Column(db.String(70), index=True, unique=False)
    outcome = db.Column(db.String(30), index=True, unique=False)
    # players = db.relationship('Player', lazy=True, backref=db.backref('playerName'))


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    playername = db.Column(db.String(30))
    username = db.Column(db.String(64), db.ForeignKey('users.name'))
    # player = db.relationship("User")

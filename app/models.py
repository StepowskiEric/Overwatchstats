import login as login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms import ValidationError
import datetime
from app import db, jwt


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    players_on_acct = db.Column(db.String(64), db.ForeignKey('players.playername'), unique=True)
    players = db.relationship('Player', foreign_keys=players_on_acct,
                              backref='users', lazy='joined')

    def to_json(self):
        return {
            "name": self.map,
            "email": self.outcome,
            "password_hash": self.match_contains_players,
            "players_on_account": self.user_name_match
        }


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
    match_contains_players = db.Column(db.String(), db.ForeignKey('players.playername'))
    match_contains_players_role = db.Column(db.String())
    match_contains_players_heroes = db.Column(db.String())
    user_name_match = db.Column(db.String(), db.ForeignKey('users.name'))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    def to_json(self):
        return {
            "map": self.map,
            "outcome": self.outcome,
            "match_contains_players": self.match_contains_players,
            "user_name_match": self.user_name_match,
            "created_at": self.created_at
        }


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    playername = db.Column(db.String(30), unique=True, nullable=False)
    role = db.Column(db.String(30))
    heroes = db.Column(db.String(35))
    username = db.Column(db.String(64), db.ForeignKey('users.name'))


    def to_json(self):
        return {
            "playername": self.playername,
            "role": self.role,
            "heroes": self.heroes,
            "username": self.username
        }

import login as login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from wtforms import ValidationError

from app import db, login_manager


class Users(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=False)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    num_of_players = db.Column(db.String(6))

    def __repr__(self):
        return '<User {}>'.format(self.name)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_json(self):
        return {"name": self.name,
                "email": self.email}

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(20), index=True, unique=False)
    role = db.Column(db.String(10), index=True, unique=False)
    heroesPlayed = db.Column(db.String(60), index=True, unique=False)


@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))

db.create_all()
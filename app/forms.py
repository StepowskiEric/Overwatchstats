from flask_wtf import FlaskForm
from wtforms import BooleanField, StringField, PasswordField, SelectMultipleField, SelectField
from wtforms.validators import InputRequired, Email, Length
from app import models


class RegisterForm(FlaskForm):
    name = StringField("Name", validators=[Length(min=2, max=25), InputRequired()])
    email = StringField("Email", validators=[InputRequired(), Email(message="Invalid email"), Length(max=50)])
    password = StringField("Password", validators=[InputRequired()])
    players = StringField("Number of players", validators=[InputRequired()])


class LoginForm(FlaskForm):
    class Meta:
        csrf = False
    email = StringField("Email", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    remember = BooleanField('Remember me')


class PlayerForm(FlaskForm):
    nickname = StringField("nickname", validators=[InputRequired()])
    role = StringField("role", validators=[InputRequired()])
    heroesplayed = SelectMultipleField("heroesplayed", choices=[('Ana','Ashe'),('Baptise',"Bastion"),('Brigiette','D.Va'),('Doomfist','Echo'),('Genji','Hanzo'),('Junkrat'
    'Lucio'),('Mccree','Mei'),('Mercy','Moira'),('Orisa','Pharah'),('Reaper', 'Reinhardt'),('Roadhog','Sigma'),('Soldier:76','Sombra'),('Symmetra','Torbjorn'),('Tracer','Widowmaker'),('Winston','Wrecking Ball'),('Zarya','Zenyatta')
                                                                                                                                                       ], validators=[InputRequired()])

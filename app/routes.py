import datetime
import json
import os

import flask
from flask import render_template, request, jsonify, send_from_directory
from flask_json import json_response
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity, current_user
)

from app.models import User, Player, Match
from app import app, db, jwt



@app.route('/index')
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')



@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(data['password']):
        return json_response(status=500, data="Invalid login credentials")
    else:
        access_token = create_access_token(identity=user)
        return jsonify(access_token=access_token), 401


@app.route('/register', methods=['POST'])
def register():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        if 'email' not in data or 'password' not in data or 'password' not in data:
            return json_response(status_=500, data="Incorrect JSON entered")
        email = data['email']
        user = User.query.filter_by(email=email).first()
        if data['email'] is None or data['password'] is None or data['name'] is None:
            return json_response(status=500, data="Please enter information in all fields")
        if user:
            return json_response(status=500, data="Email is already taken.")
        else:
            new_user = User(name=data['name'], email=data['email'],
                            password_hash=data['password'])
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()
            return json_response(status=200, data=data)


# if you post to method it creates a player and get returns all players associated with the user
@app.route('/player', methods=['GET', 'POST'])
def player():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        new_player = Player(playername=data['playername'], role=data['role'], heroes=data['heroes'], username=user.name)
        # player_name = (data['playername'])
        db.session.add(new_player)
        db.session.commit()
        return json_response(status=200, data=data)


@app.route('/addmatch', methods=['POST'])
def add_match():
    data = json.loads(request.data)
    new_match = Match(map=data['map'], outcome=data['outcome'], match_contains_players=data['players'])
    db.session.add(new_match)
    db.session.commit()
    return json_response(status=200, data=data)



@app.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        full_name=current_user.name,
        username=current_user.email,
    )


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

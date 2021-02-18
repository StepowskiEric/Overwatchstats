from _datetime import datetime, timedelta, timezone
import json
import os

import flask
from flask import render_template, request, jsonify, send_from_directory
from flask_json import json_response
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity, current_user, get_jwt, set_access_cookies
)

from app.models import User, Player, Match
from app import app, db, jwt, cors, cross_origin
from sqlalchemy import select


@app.route('/index')
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin()
def index(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/login', methods=['GET'])
@jwt_required()
@cross_origin()
def test():
    if flask.request.method == 'GET':
        return json_response(
            id=current_user.id,
            full_name=current_user.name,
            username=current_user.email,
            status=200
        )


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        email = data['email']
        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(data['password']):
            return json_response(status=500, data="Invalid login credentials")
        else:
            access_token = create_access_token(identity=user)
            players = db.session.query(Player).filter_by(username='test').all()
            list_players = [Player.to_json() for Player in players]

            response = json_response(status=200, data=list_players)
            set_access_cookies(response, access_token)
            return response


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route('/logout')
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        if 'email' not in data or 'password' not in data or 'password' not in data:
            return json_response(status_=500, data="Incorrect JSON entered")
        email = data['email']
        user = User.query.filter_by(email=email).first()
        if data['email'] is None or data['password'] is None or data['name'] is None:
            return json_response(status=500, data="Please enter information in all fields")
        else:
            new_user = User(name=data['name'], email=data['email'],
                            password_hash=data['password'])
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()
            return json_response(status=200, data=data)


@app.route('/player', methods=['GET', 'POST', 'UPDATE', 'DELETE'])
@cross_origin()
# @jwt_required()
def player():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        new_player = Player(playername=data['playername'], role=data['role'], heroes=data['heroes'], username=user.name)
        db.session.add(new_player)
        db.session.commit()
        user.players_on_acct = new_player.playername
        db.session.commit()
        return json_response(status=200, data=data)

    if flask.request.method == 'GET':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        if user is not None:
            players = Player.query.all()
        for __dict__ in players:
            print(vars(__dict__))

        playerz = [Player.to_json() for Player in players]
        return json_response(status=200, data=playerz)
        # return json_response(status=200, data=jsonString)

    if flask.request.method == 'UPDATE':
        data = json.loads(request.data)
        player = Player.query.filter_by(playername=data['playername']).first()
        player.playername = data['playernameupdated']
        player.role = data['role']
        player.heroes = data['heroes']
        db.session.commit()
        return json_response(status=200, data=data)

    if flask.request.method == 'DELETE':
        data = json.loads(request.data)
        player = Player.query.filter_by(playername=data['playername']).first()
        if player is not None:
            db.session.delete(player)
            db.session.commit()
            return json_response(status=200, data="Deleted " + player.playername)


@app.route('/match', methods=['POST', 'GET', 'UPDATE', 'DELETE'])
@cross_origin()
def add_match():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        player = Player.query.filter_by(playername=data['playername']).first()
        new_match = Match(map=data['map'], outcome=data['outcome'], user_name_match=user.name, match_contains_players=user.players_on_acct, match_contains_players_role = player.role,
                          match_contains_players_heroes = player.heroes)
        db.session.add(new_match)
        db.session.commit()
        return json_response(status=200, data=data)

    if flask.request.method == 'GET':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        if user is not None:
            matches = Match.query.all()
            list_matches = [Match.to_json() for Match in matches]
            return json_response(status=200, data=list_matches)

    if flask.request.method == 'UPDATE':
        data = json.loads(request.data)
        match = Match.query.filter_by(user_name_match=data['user_match']).first()
        match.map = data['mapupdated']
        match.outcome = data['outcome']
        match.match_contains_players = data['players_match']
        db.session.commit()
        return json_response(status=200, data=data)

    if flask.request.method == 'DELETE':
        data = json.loads(request.data)
        match = Match.query.filter_by(user_name_match=data['user_match']).first()
        if match is not None:
            db.session.delete(match)
            db.session.commit()
            return json_response(status=200,
                                 data="Deleted match with following details: " + match.id + " " + match.map + " " + match.outcome)


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

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

from app.models import User, Player, Match, playerMatch
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
        if 'email' or 'password' not in data:
            return json_response(status=500, error='JSON email or password not found')
        email = data['email']
        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(data['password']):
            return json_response(status=500, error="Invalid login credentials")
        else:
            access_token = create_access_token(identity=user)
            players = db.session.query(Player).filter_by(username=user.name).all()
            matches = db.session.query(Match).filter_by(user_of_match=user.name).all()
            list_players = [Player.to_json() for Player in players]
            list_matches = [Match.to_json() for Match in matches]

            response = json_response(status=200, player_list=list_players)
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
        if 'email' not in data or 'name' not in data or 'password' not in data:
            return json_response(status_=500, data="Incorrect JSON entered")
        email = data['email']
        name = data['name']
        ##NOTE IF EMAIL AND USERNAME ARE DIFFERENT BUT THATS WHATS ENTERED, IT WILL CAUSE AN ERROR! need to fix
        username = User.query.filter_by(name=name).first()
        useremail = User.query.filter_by(email=email, name=name).first()
        if username is not None:
            return json_response(status=500, error='Username already exists')
        if useremail is not None:
            return json_response(status=500, error="email already exists.")
        if data['email'] is None or data['password'] is None or data['name'] is None:
            return json_response(status=500, data="Please enter information in all fields")
        else:
            new_user = User(name=data['name'], email=data['email'],
                            password_hash=data['password'])
            new_user.set_password(data['password'])
            db.session.add(new_user)
            db.session.commit()
            return json_response(status=200, email=new_user.email, username=new_user.name)


@app.route('/player', methods=['GET', 'POST', 'UPDATE', 'DELETE'])
@cross_origin()
# @jwt_required()
def player():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        player = Player.query.filter_by(playername=data['playername']).first()
        if player is not None:
            return json_response(status=500, error='Player with that name already exists')
        new_player = Player(playername=data['playername'], username=user.name)
        db.session.add(new_player)
        db.session.commit()
        user.players_on_acct = new_player.playername
        db.session.commit()
        return json_response(status=200, playername=new_player.playername)

    if flask.request.method == 'GET':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        if user is None:
            return json_response(status=500, error='Username was not found')
        else:
            players = Player.query.all()
            playerz = [Player.to_json() for Player in players]
        return json_response(status=200, players_in_the_game=playerz)

    if flask.request.method == 'UPDATE':
        data = json.loads(request.data)
        player = Player.query.filter_by(playername=data['playername']).first()
        user = User.query.filter_by(name=data['name']).first()
        player_match_update = playerMatch.query.filter_by(playername=data['playername'])
        if player is None or User is None:
            return json_response(status=500, error="Player or User does not exist")

        user.players_on_acct = data['playernameupdated']
        db.session.commit()
        player_match_update = playerMatch.query.filter_by(playername=data['playername'])
        player.playername = data['playernameupdated']
        db.session.commit()
        player_match_update.playername = data['playernameupdated']
        player.role = data['role']
        player.heroes = data['heroes']
        db.session.commit()
        json_player = jsonify(player)
        return json_response(status=200, updated_player="test")

    if flask.request.method == 'DELETE':
        data = json.loads(request.data)
        player = Player.query.filter_by(playername=data['playername']).first()
        if player is not None:
            db.session.delete(player)
            db.session.commit()
            return json_response(status=200, player_deleted="Deleted " + player.playername)


@app.route('/match', methods=['POST', 'GET', 'UPDATE', 'DELETE'])
@cross_origin()
def add_match():
    if flask.request.method == 'POST':
        data = json.loads(request.data)
        user = User.query.filter_by(name=data['name']).first()
        if user is None:
            return json_response(status=500, error="Username does not exist")
        # players = Player.query.filter_by(username=data['name']).all()
        player = Player.query.filter_by(playername=data['playername']).first()
        new_match = Match(map=data['map'], outcome=data['outcome'], user_of_match=user.name)
        db.session.add(new_match)
        db.session.commit()
        # list_players = [Player.to_json() for Player in players]
        new_list = []
        new_list2 = []
        # for x in list_players:
        if player is None:
            return json_response(status=500, error='Player name does not exist')
        new_match_players = playerMatch(match_id=new_match.id, playername=player.playername, username=user.name,
                                        role=data['role'],
                                        heroes=data['heroes'])
        db.session.add(new_match_players)
        db.session.commit()
        matches = Match.query.filter_by(user_of_match=user.name).all()
        list_matches = [Match.to_json() for Match in matches]
        # for i in matches:

        # player_matches = [playerMatch.query.filter_by(match_id=i.id).first()]
        # matches_with_players = [Match.query.filter_by(user_of_match=user.name).first()]
        # new_list.append(player_matches)
        # new_list2.append(matches_with_players)

        # test_dict = {'Matches': new_list2 + new_list}
        return json_response(status=200, matches="match created")

    if flask.request.method == 'GET':
        data = json.loads(request.data)
        list_of_matches = []
        list3 = []
        user = User.query.filter_by(name=data['name']).first()
        if user is not None:
            matches = Match.query.filter_by(user_of_match=user.name).all()
            for x in matches:
                player_matches = playerMatch.query.filter_by(match_id=x.id).all()
                list_player_matches = [playerMatch.to_json() for playerMatch in player_matches]
                match = Match(id=x.id, map=x.map, outcome=x.outcome, user_of_match=user.name)
                match_to_json = match.to_json()
                list_of_match_players = []
                list_of_matches.append(match_to_json)
                list_of_match_players.append(list_player_matches)

                test_dict = {'Match': [{
                    'created_at': x.created_at,
                    'map': x.map,
                    'outcome': x.outcome,
                    'players_in_match': list_of_match_players,
                    'user_of_match': user.name}],
                    #'players_in_match': new_list
                }
                list3.append(test_dict)

            return json_response(status=200, matches=list3)

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


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

from app import app
from flask import Flask, request
from flask import render_template
from markupsafe import escape


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/addmatch', methods=['POST'])
def addMatch():
    return render_template('addmatch.html')
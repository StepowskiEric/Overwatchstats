from app import app
from flask import Flask, request
from flask import render_template
from markupsafe import escape

app = Flask(__name__, template_folder="templates")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/addmatch')
def addMatch():
    return "hello?"


if __name__ == '__main__':
    app.run(debug=True, port=4996)

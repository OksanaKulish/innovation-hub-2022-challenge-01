import json
from flask_lambda import FlaskLambda
from flask import request

app = FlaskLambda(__name__)

@app.route('/hello', methods=['GET', 'POST'])
def hello():
    data = {
        "message": "Hello, world!",
        "args" : request.args
    }
    return (
        json.dumps(data),
        200,
        {'Content-Type': 'application/json'}
    )


@app.route('/route2', methods=['GET', 'POST'])
def route2():
    data = {
        "message": "This is root route",
        "requestBody " : request.json

    }
    return (
        json.dumps(data),
        200,
        {'Content-Type': 'application/json'}
    )

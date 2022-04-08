import base64
import json
import numpy as np
import tensorflow as tf

from PIL import Image
from io import BytesIO

import pandas as pd
from keras.models import load_model

from constants import *
from cat_columns_encoder import transform_cat_columns, replace_categorical_column
import json
from flask import request, Flask
try:
    from flask_cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask_cors import CORS

model = load_model(MODEL_PATH)

app = Flask(__name__)
cors = CORS(app)


def data_prep(event):
    """
    :param event: dict into json format of the input values
    :return: numpy array with prepared data to model input
    """
    # check lengths of variables
    # TODO: change when the format of multirows json will be known
    value_length = 1
    data = pd.DataFrame(event, index=list(range(value_length)))

    # check columns order
    data = data[COLUMNS_ORDER]

    # catch exception if data can't be changed into numbers
    try:
        data = data.astype(float)
    except Exception as error:
        print(str(error))

    cat_column = data["Origin"].values
    encoded_columns = transform_cat_columns(cat_column)
    data = replace_categorical_column(data, "Origin", encoded_columns)

    return data.values


def predict(data):
    results = model.predict(data).flatten()
    return results

@app.route('/api/getValue', methods=['POST'])
def getValuePost():
    dataset = data_prep(request.json)
    results = predict(dataset)
    print(results)

    data = {
        "predicted_label" : str(results[0])
    }

    print(data)
    return (
        json.dumps(data),
        200,
        {'Content-Type': 'application/json'}
    )

@app.route('/api/getValue', methods=['GET'])
def getValue():
    dataset = data_prep(request.args)
    results = predict(dataset)
    print(results)

    data = {
        "predicted_label " : str(results[0])
    }

    print(data)
    return (
        json.dumps(data),
        200,
        {'Content-Type': 'application/json'}
    )

@app.route('/api/getBulkValues', methods=['GET'])
def getBulkValue():
    return {
        'args': request.args['url'],
        'method': 'ok'
    }

@app.route('/api/ping', methods=['GET', 'POST'])
def ping():
    return {
        'statusCode': 200,
        'body': 'ping is ok'
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
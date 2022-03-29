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
from flask_lambda import FlaskLambda
from flask import request
from flask_cors import CORS, cross_origin

model = load_model(MODEL_PATH)

app = FlaskLambda(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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

@cross_origin()
@app.route('/getValue', methods=['POST'])
def getValuePost():
    dataset = data_prep(request.json)
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

@cross_origin()
@app.route('/getValue', methods=['GET'])
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

@cross_origin()
@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return {
        'statusCode': 200,
        'body': 'ping is ok'
    }

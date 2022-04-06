import base64
import json
import numpy as np
import tensorflow as tf

from PIL import Image
from io import BytesIO

import pandas as pd
import logging
from keras.models import load_model

from constants import *
from cat_columns_encoder import transform_cat_columns, replace_categorical_column
import json
from flask_lambda import FlaskLambda
from flask import request, Flask
try:
    from flask_cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask_cors import CORS

# add logs to CloudWatch
logger = logging.getLogger()
logger.setLevel(logging.INFO)

model = load_model(MODEL_PATH)

app = FlaskLambda(__name__)
cors = CORS(app)


def data_prep(event):
    """
    :param event: dict, or json, or url to the input values
    :return: numpy array with prepared data to model input
    """
    if isinstance(event, str):  # if event is url (multiple values sets)
        data = pd.read_csv(event)
    else:  # if event is json or dict (single values set)
        value_length = 1
        data = pd.DataFrame(event, index=list(range(value_length)))

    if data.isna().any().any():
        error = "Empty values are met in data. Fill empty values"
        print(error)
        logger.error(error)

    # check columns order
    data.columns = data.columns.str.lower()
    data = data[COLUMNS_ORDER]

    # catch exception if data can't be changed into numbers
    try:
        data = data.astype(float)
    except Exception as error:
        error = str(error)
        print(error)
        logger.error(error)

    # categorical column to one-hot-encoding
    cat_column = data["origin"].values
    encoded_columns = transform_cat_columns(cat_column)
    data = replace_categorical_column(data, "origin", encoded_columns)

    return data.values


def predict(data):
    results = model.predict(data).flatten()
    results = results.astype(str).tolist()
    return results

@app.route('/getValue', methods=['POST'])
def getValuePost():
    dataset = data_prep(request.json)
    logger.info("data was read and prepared for the model")
    results = predict(dataset)
    logger.info("successful prediction step")
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

@app.route('/getValue', methods=['GET'])
def getValue():
    dataset = data_prep(request.args)
    logger.info("data was read and prepared for the model")
    results = predict(dataset)
    logger.info("successful prediction step")
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

@app.route('/getBulkValues', methods=['GET'])
def getBulkValue():
    dataset = data_prep(request.args['url'])
    logger.info("data was read and prepared for the model")
    results = predict(dataset)
    logger.info("successful prediction step")
    print(results)

    data = {
        "predicted_label" : results
    }
    return (
        json.dumps(data),
        200,
        {'Content-Type': 'application/json'}
    )

@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return {
        'statusCode': 200,
        'body': 'ping is ok'
    }

#if __name__ == "__main__":
#    app.run(debug=True)
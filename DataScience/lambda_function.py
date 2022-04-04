import base64
import json
import numpy as np
import tensorflow as tf

from PIL import Image
from io import BytesIO

import pandas as pd
from keras.models import load_model
import logging

from constants import *
from utils.cat_columns_encoder import transform_cat_columns, replace_categorical_column

# TODO: add exceptions for use cases

# add logs to CloudWatch
logger = logging.getLogger()
logger.setLevel(logging.INFO)

model = load_model(MODEL_PATH)


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
    """
    :param data: numpy array with input values
    :return: results as 1D numpy array
    """
    results = model.predict(data).flatten()
    return results


def lambda_handler(event, context):
    dataset = data_prep(event)
    logger.info("data was read and prepared for the model")
    results = predict(dataset)
    logger.info("successful prediction step")
    print(results)

    return {
        'statusCode': 200,
        'body': json.dumps(
            {
                "predicted_label": "testMessage",
            }
        )
    }


if __name__ == "__main__":
    event = {
        "Cylinders": "8",
        "Displacement": "307",
        "Horsepower": "130",
        "Weight": "3504",
        "Acceleration": "12",
        "Model year": "70",
        "Origin": "1"
    }

    # event = 'https://angular-simple-ui.s3.eu-west-2.amazonaws.com/csvfiles/6b583681-114f-49ab-9693-aa8dd4dbf3c5'
    lambda_handler(event, context="")

    print()

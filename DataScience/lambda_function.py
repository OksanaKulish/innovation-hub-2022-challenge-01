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
    :param event: dict into json format of the input values
    :return: numpy array with prepared data to model input
    """
    # check lengths of variables
    # TODO: change when the format of multirows json will be known
    value_length = 1
    if isinstance(event, list):
        event = dict(event)
    data = pd.DataFrame(event, index=list(range(value_length)))

    # check columns order
    data = data[COLUMNS_ORDER]

    # catch exception if data can't be changed into numbers
    try:
        data = data.astype(float)
    except Exception as error:
        print(str(error))
        logger.error(str(error))

    cat_column = data["Origin"].values
    encoded_columns = transform_cat_columns(cat_column)
    data = replace_categorical_column(data, "Origin", encoded_columns)

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


# if __name__ == "__main__":
#     event = [('Acceleration', '12'), ('Cylinders', '8'), ('Displacement', '307'), ('Horsepower', '130'), ('Model year', '70'),
#              ('Origin', '1'), ('Weight', '3504')]
#
    # event = {
    #     "Cylinders": "8",
    #     "Displacement": "307",
    #     "Horsepower": "130",
    #     "Weight": "3504",
    #     "Acceleration": "12",
    #     "Model year": "70",
    #     "Origin": "1"
    # }
    #
    # lambda_handler(event, context="")
    #
    # print()

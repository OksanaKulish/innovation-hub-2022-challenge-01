from sklearn.preprocessing import OneHotEncoder
import numpy as np
import pickle

from DataScience.constants import *


def reshape_columns(columns):
    if len(columns.shape) < 2:
        columns = np.expand_dims(columns, axis=1)
    # check whether the shape is correct
    assert len(columns.shape) == 2, "Wrong shape of categorical columns for one-hot encoder"

    return columns


def fit_encoder(columns, encoder_path=CATEGORICAL_ENCODER_PATH, to_save=True):
    # check columns' shape
    columns = reshape_columns(columns)

    encoder = OneHotEncoder()
    encoder.fit(columns)

    # save_encoder
    if to_save:
        with open(encoder_path, "wb") as file:
            pickle.dump(encoder, file)


def transform_cat_columns(columns, encoder_path=CATEGORICAL_ENCODER_PATH):
    # check columns' shape
    columns = reshape_columns(columns)

    # read fitted encoder
    with open(encoder_path, "rb") as file:
        encoder = pickle.load(file)

    columns_encoded = encoder.transform(columns).toarray()
    return columns_encoded


# TODO: change for multiple columns
def replace_categorical_column(dataframe, column_name, encoded_columns):
    dataframe.drop([column_name], axis=1, inplace=True)
    # change categorical column to encoded
    encoded_column_names = list(map(lambda x: f"{column_name}_{x}", range(1, encoded_columns.shape[1] + 1)))
    dataframe[encoded_column_names] = encoded_columns

    return dataframe

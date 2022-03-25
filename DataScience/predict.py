import pandas as pd

from keras.models import load_model


def data_prep(data):
    data = pd.get_dummies(data, columns=['Origin'])  # dummies for category column

    return data


def predict():
    return 1


if __name__ == "__main__":
    dataset = pd.read_csv("data/Auto_MPG.csv")

    # TODO: change into error when nans met
    dataset = dataset.dropna()  # drop all rows if any NaN
    pred_data = dataset.drop(["MPG"], axis=1).values

    pred_data = data_prep(pred_data)

    print()

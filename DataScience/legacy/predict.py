import pandas as pd
from keras.models import load_model

# TODO: add reading data from json
# TODO: add logging
# TODO: add exceptions for use cases

model_path = "../trained_models/model_epoch200_adam001.ckpt"
model = load_model(model_path)


def data_prep(data):
    """
    :param data: pandas DataFrame with data
    :return: numpy array with prepared data to model input
    """
    data = pd.get_dummies(data, columns=['Origin'])  # dummies for category column
    return data.values


def predict(data):
    results = model.predict(data).flatten()
    return results


if __name__ == "__main__":
    dataset = pd.read_csv("../data/Auto_MPG.csv")

    # TODO: change when input json
    dataset = dataset.dropna()  # drop all rows if any NaN
    dataset = dataset.drop(["MPG"], axis=1)

    dataset = data_prep(dataset)
    results = predict(dataset)
    print(results)

import pandas as pd
import numpy as np


if __name__ == "__main__":
    dataset = pd.read_csv("data/Auto_MPG.csv")

    # data prep for training
    dataset = dataset.dropna()
    dataset = pd.get_dummies(dataset, columns=['Origin'])

    print(dataset.head())

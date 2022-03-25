import pandas as pd
from sklearn.model_selection import train_test_split
from matplotlib import pyplot as plt

from tensorflow import keras
from keras import Sequential
from keras.layers import Dense

random_state = 42


def build_and_compile_model(normalizer):
    model = Sequential([
      normalizer,
      Dense(64, activation='relu'),
      Dense(64, activation='relu'),
      Dense(1)
    ])

    model.compile(loss='mean_absolute_error',
                  optimizer=keras.optimizers.Adam(0.001),
                  metrics=["mean_squared_error", "mean_absolute_percentage_error"])
    return model


def plot_loss(history):
    plt.plot(history.history['loss'], label='loss')
    plt.plot(history.history['val_loss'], label='val_loss')
    plt.xlabel('Epoch')
    plt.ylabel('Error [MPG]')
    plt.legend()
    plt.grid(True)

    plt.show()


def evaluation(X_test, y_test):
    results = model.evaluate(X_test, y_test, verbose=1)
    print("loss =", results[0],
          "mean_squared_error =", results[1],
          "mean_absolute_percentage_error =", results[2])


if __name__ == "__main__":
    dataset = pd.read_csv("data/Auto_MPG.csv")

    # data prep for training
    dataset = dataset.dropna()  # drop all rows if any NaN
    dataset = pd.get_dummies(dataset, columns=['Origin'])  # dummies for category column

    target = dataset["MPG"].values
    data = dataset.drop(["MPG"], axis=1).values

    # split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(data, target,
                                                        test_size=0.33, random_state=random_state)

    # Create a Normalization layer and set its internal state using the training data
    normalizer = keras.layers.Normalization()
    normalizer.adapt(X_train)

    model = build_and_compile_model(normalizer)
    model.summary()

    history = model.fit(
        X_train,
        y_train,
        epochs=200,
        validation_split=0.2)
    plot_loss(history)

    model.save("trained_models/model_epoch200_adam001.ckpt")

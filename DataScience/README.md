# Regression task
Use [Auto_MPG](https://archive.ics.uci.edu/ml/datasets/auto+mpg) open-source data <br>

Columns' names and types:
1. mpg: continuous
2. cylinders: multi-valued discrete
3. displacement: continuous
4. horsepower: continuous
5. weight: continuous
6. acceleration: continuous
7. model year: multi-valued discrete
8. origin: multi-valued discrete

The task is to predict MPG column based on all other columns

### Run
Run the `predict.py` file


# Image Retrieval
An image retrieval is used for browsing, searching and retrieving images from a large database.<br>
In our case the main task here would be **image searching** based on either input text or similar image.
Therefore, here are possible pipelines for 2 tasks:
1. Image searching based on input text:<br>
This task is based on the metadata processing and searching<br>
1.2 Feature extraction:
* Image classification:<br>
The simplest way, just to predict the objects (type of car) by the image.<br> 
Then to search by the text, just to compare the input query with images' metadata
* Siamese network (with triplet loss):<br>
![plot](assets/siamese_network.PNG)
Then choose closest images to query into generated space.<br>
Pro: the approach can be used both for the image and text query
2. Image searching based on input similar image - Content Based Image Retrieval (CBIR):<br>
![plot](assets/CBIR_pipeline.PNG)
2.1 Feature extraction: <br>
On this step each image is represented as the embeddings/vectors of image's features.<br>
Possible solutions:<br>
* Encoder-Decoder - the architecture to reproduce the image itself. Then the encoder can be used to generate features embedding.
* Image classification architecture (VGG/ResNet) - for the features embedding get the last layer of pre-trained classification model.
* Can be also Siamese network<br>
2.2 Find the closest images:
* Choose metric (such as Euclidean distance) and compare all images' distances to find the closet ones
* Use any clusterization approach 

Resources:
* [CBIR using CNN](https://medium.com/sicara/keras-tutorial-content-based-image-retrieval-convolutional-denoising-autoencoder-dc91450cc511)
* [CBIR with Siamese networks](https://neptune.ai/blog/content-based-image-retrieval-with-siamese-networks) (also with the text input)
* [Features extraction with Tensorflow (Decoder-Encoder and VGG)](https://www.analyticsvidhya.com/blog/2021/01/querying-similar-images-with-tensorflow/)
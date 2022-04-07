FROM public.ecr.aws/lambda/python:3.8

COPY app.py requirements.txt constants.py cat_columns_encoder.py ./
COPY model /opt/ml/model
COPY categorical_encoder ./categorical_encoder
COPY trained_models ./trained_models

RUN python3.8 -m pip install --trusted-host pypi.org -v --trusted-host pypi.python.org --trusted-host files.pythonhosted.org -r requirements.txt -t .

CMD ["app.app"]

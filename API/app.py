from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'App Works!'

@app.route('/ping')
def ping():
    return 'ping OK'


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
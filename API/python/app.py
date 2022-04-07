from flask import request, Flask
try:
    from flask_cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def index():
    return 'App Works!'

@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return {
        'statusCode': 200,
        'body': 'ping is ok'
    }

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
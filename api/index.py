from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# * /api/hello
@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify(
        {"status": "success", "message": "Hello from backend by flask for testing :)"}
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)

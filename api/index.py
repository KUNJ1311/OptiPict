from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# * /api/hello
@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify(
        {"status": "success", "message": "Integrate Flask Framework with Next.js"}
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)

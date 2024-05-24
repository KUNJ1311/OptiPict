from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from keras.models import load_model
from PIL import Image
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

model_color = load_model("C:\\Kunj\\Programming\\Next\\optipict\\api\\color_64.h5")
UPLOAD_FOLDER = "C:\\Kunj\\Programming\\Next\\optipict\\api\\uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# * /api/hello
@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify(
        {"status": "ok", "message": "Hello from backend by flask for testing :)"}
    )


# * /api/compress
@app.route("/api/compress", methods=["POST"])
def compress():
    if "file" not in request.files:
        return jsonify({"success": False, "msg": "No file part"})

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"success": False, "msg": "No selected file"})

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)
        image = Image.open(filepath)
        image = image.convert("RGB")
        image = np.array(image) / 255.0
        height, width, channels = image.shape
        resized_image = image
        # Check if either height or width is greater than 1000
        if height > 1500 or width > 1500:
            # Calculate the aspect ratio
            aspect_ratio = width / height

            # Calculate the new dimensions
            new_width = min(width, 1500)
            new_height = int(new_width / aspect_ratio)

            # Resize the image while maintaining aspect ratio
            resized_image = cv2.resize(image, (new_width, new_height))

            # Check if the new height exceeds 1000
            if new_height > 1500:
                # Calculate the final dimensions
                final_height = 1500
                final_width = int(final_height * aspect_ratio)

                # Resize the image to final dimensions
                resized_image = cv2.resize(resized_image, (final_width, final_height))

        input_image = np.expand_dims(resized_image, axis=0)
        predicted_image = model_color.predict(input_image)

        return jsonify(
            {
                "success": True,
                "msg": "File uploaded and compressed",
                "filename": filename,
                "data": predicted_image[0],
            }
        )


if __name__ == "__main__":
    app.run(debug=True, port=8080)

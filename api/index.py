from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
import base64
from io import BytesIO
from werkzeug.utils import secure_filename
from keras.models import load_model
from PIL import Image
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)
sys.stdin.reconfigure(encoding="utf-8")
sys.stdout.reconfigure(encoding="utf-8")

model_color = load_model("./api/color_64.h5")


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
        image = Image.open(file.stream)
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
        # Scale the pixel values back to the original range (0-255) for uint8 format
        compressed_img_uint8 = (predicted_image[0] * 255).astype(np.uint8)

        # Convert the compressed image to an in-memory file
        _, buffer = cv2.imencode(
            ".jpg", cv2.cvtColor(compressed_img_uint8, cv2.COLOR_RGB2BGR)
        )
        compressed_image_io = BytesIO(buffer)

        # Encode image in base64
        compressed_image_base64 = base64.b64encode(buffer).decode("utf-8")

        # Return JSON with the base64 encoded image
        return jsonify(
            {
                "success": True,
                "msg": "File compressed",
                "filename": filename,
                "image_data": compressed_image_base64,
            }
        )


if __name__ == "__main__":
    app.run(debug=True, port=8080)

# OptiPict

Lossy image compression with a convolutional autoencoder, served as a web app.

Upload a JPG or PNG, and a CNN autoencoder running behind a Flask API encodes the image into a compact latent representation and reconstructs it; the app returns the result as a JPEG and shows the original and compressed sizes side by side. The front end is Next.js, the inference service is Flask + TensorFlow/Keras, and both ship as Docker images.

## How it works

```
browser ──▶ Next.js (src/app/compress-image) ──POST /api/compress──▶ Flask (api/index.py)
                                                                      │  load color_64.h5 (Keras CNN autoencoder)
                                                                      │  image → [0,1] tensor → encoder → latent → decoder
                                                                      │  reconstructed tensor → JPEG (OpenCV) → base64
                                                                      ◀── JSON { image_data }
           preview + "File Size Comparison" (original vs compressed) ◀──┘
```

- **Model**: `api/color_64.h5`, a convolutional autoencoder for colour images. The encoder's stack of convolutions squeezes the image into a low-dimensional bottleneck; the decoder learns to rebuild the image from it. Compression comes from what the bottleneck can and cannot represent, learned from data rather than fixed by a DCT-style codec.
- **API**: `POST /api/compress` takes a multipart `file`, converts it to RGB, normalises to `[0, 1]`, runs the model, scales back to 8-bit and encodes the output as JPEG. `GET /api/hello` is a health check.
- **UI**: drag-and-drop upload (`react-dropzone`), a preview of the result, and a size comparison bar.

## Run locally

Requirements: Node 18+, Python 3.10, the Python dependencies in `api/requirements.txt` (TensorFlow 2.16, Flask 3, OpenCV, Pillow).

```bash
git clone https://github.com/KUNJ1311/OptiPict.git
cd OptiPict
cp .env.example .env                     # NEXT_PUBLIC_HOST=http://localhost:8080/
pip install -r api/requirements.txt
npm install
npm run dev                              # next dev on :3000 + flask on :8080, via concurrently
```

Open http://localhost:3000 and drop an image on the compress page.

## Run with Docker

Two images: the inference API and the web app.

```bash
# API (Flask + TensorFlow, gunicorn on :8080)
# api/index.py loads the model from ./api/color_64.h5; inside the container the file sits at ./color_64.h5,
# so change that path (or symlink) before building.
docker build -t optipict-api ./api
docker run -p 8080:8080 optipict-api

# Web (Next.js on :3000)
docker build -t optipict-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_HOST=http://localhost:8080/ optipict-web
```

The images were deployed on Azure with the API image published to Docker Hub.

## API

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `/api/hello` | – | `{ "status": "ok", "message": "..." }` |
| `POST` | `/api/compress` | multipart form, field `file` (JPG/PNG/JPEG) | `{ "success": true, "filename": "...", "image_data": "<base64 JPEG>" }` |

## Limitations

- Images are processed at their full resolution (the resize step in `api/index.py` is commented out), so very large images are slow and memory-hungry.
- Output is always JPEG; there is no quality or latent-size control yet.
- The training notebook is not in this repository; the model ships as `color_64.h5`.

## Ideas

- A quality slider driven by latent size, with PSNR/SSIM shown next to the file-size comparison.
- WebP output and batch uploads.
- Resize-then-compress for images above a size threshold.

## Stack

Next.js 14 · React 18 · react-dropzone · Flask 3 · TensorFlow 2.16 / Keras · OpenCV · Pillow · gunicorn · Docker · Azure

## License

MIT


from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from ultralytics import YOLO
import cv2
import numpy as np
import base64

# Flask Setup
app = Flask(__name__)

# Allow ALL origins during development
CORS(app, resources={r"/*": {"origins": "*"}})

#  Firebase Setup 
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
collection_name = "eye_features"

# YOLO Model 
# Load model once at startup (MUCH safer)
model = YOLO(r"C:\7th Sem\Saigeware\Backend\edm.pt")


#  Feature Extraction
def extract_eye_features(cropped_eye):
    gray = cv2.cvtColor(cropped_eye, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape

    brightness = float(np.mean(gray))
    openness = float(h / w) if w != 0 else 0
    area = float(h * w)

    half_w = w // 2
    left = gray[:, :half_w]
    right = gray[:, w - half_w:]
    right = cv2.flip(right, 1)

    min_w = min(left.shape[1], right.shape[1])
    left = left[:, :min_w]
    right = right[:, :min_w]

    symmetry = float(np.mean(cv2.absdiff(left, right)))

    return {
        "area": area,
        "openness": openness,
        "brightness": brightness,
        "symmetry": symmetry
    }


#  Upload Route 
@app.route("/api/upload", methods=["POST"])
def upload_image():
    print("POST /api/upload called")

    data = request.get_json()
    if not data or "image" not in data:
        return jsonify({"status": "error", "message": "No image found"}), 400

    try:
        img_bytes = base64.b64decode(data["image"])
        img_np = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_np, cv2.IMREAD_COLOR)
    except Exception:
        return jsonify({"status": "error", "message": "Invalid image encoding"}), 400

    if img is None:
        return jsonify({"status": "error", "message": "Image decode error"}), 400

    # YOLO inference
    try:
        results = model(img)[0]
    except Exception as e:
        print("YOLO Error:", str(e))
        return jsonify({"status": "error", "message": "YOLO failed"}), 500

    features_list = []

    for box in results.boxes.xyxy.cpu().numpy():
        x1, y1, x2, y2 = map(int, box[:4])

        eye_crop = img[y1:y2, x1:x2]
        if eye_crop.size == 0:
            continue

        feats = extract_eye_features(eye_crop)
        features_list.append(feats)

    # Store in Firebase
    db.collection(collection_name).document().set({"features": features_list})

    return jsonify({
        "status": "success",
        "saved_count": len(features_list)
    })


#  Fetch Features
@app.route("/api/features", methods=["GET"])
def get_features():
    docs = db.collection(collection_name).stream()
    all_items = [doc.to_dict() for doc in docs]
    return jsonify(all_items)


if __name__ == "__main__":
    print("🚀 Starting Flask at http://127.0.0.1:5000")
    # Threaded = prevents random fetch freezes
    app.run(debug=True, threaded=True)





# 👁️ Eye Detection with YOLO
This project implements an eye detection model using YOLO(You Only Look Once) architecture trained on the iBUG 300W Large Face Landmark Dataset. The goal is to accurately detect and localize eyes in facial images and  retrieve features like shape, symmetry, openness and brightness.
## DataSet
The project uses the iBUG 300W Large Face Landmark Dataset, which contains:

* Images: Thousands of facial images with varying poses, expressions, and lighting conditions.

* Annotations: 68 facial landmarks per image, including points for eyes, eyebrows, nose, mouth, and jawline.

* Formats: Images are provided in .jpg format with corresponding landmark files in .pts format.

## Model Used 
yolov8s.pt is the Small variant of the YOLOv8 object detection family developed by Ultralytics. It is designed to offer an excellent balance between accuracy and real-time performance while keeping the model lightweight. 
With roughly 11 million parameters and a compact file size, YOLOv8s runs efficiently on both GPUs and CPUs, making it suitable for edge devices and real-time applications such as eye detection, face analysis, and small-object tracking. 
The model follows YOLOv8’s anchor-free architecture, which simplifies training and improves generalization. 
It uses a modern backbone with enhanced feature extraction and a feature-pyramid neck that strengthens detection across scales, especially for small objects like pupils or eye regions. 
Pre-trained on the COCO dataset, yolov8s.pt provides strong baseline performance and can be easily fine-tuned for custom tasks. 
Overall,  it offers a practical mix of speed, accuracy, and deployability for real-world vision projects.

## 🚀 How to Run
### 1. Clone this repository
```bash
git clone https://github.com/your-username/EyeDetectionYOLO.git
cd EyeDetectionYOLO
```
### 2. Set-up the environment 
```bash
pip install -r requirements.txt
```
### 3. Create 2 separate terminals 
Terminal 1 
```bash
cd Backend //navigate to backend
python EyeDetection.py
```
Terminal 2
``` bash
cd eyedetection
npm install
npm start
```

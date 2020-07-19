import sys
import base64
import numpy as np
from dbn.tensorflow import SupervisedDBNClassification
import cv2
import face_recognition

img_bytes = base64.b64decode(str.encode(sys.argv[1]))
im_arr = np.frombuffer(img_bytes, dtype=np.uint8)
img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
rgb_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# detect the (x,y)-coordinates of the bounding boxes
# corresponding to each face in the input image
# we are assuming the the boxes of faces are the SAME FACE or SAME PERSON
boxes = face_recognition.face_locations(rgb_image, model='hog')
# compute the facial embedding for the face
# creates a vector of 128 numbers representing the face
encodings = face_recognition.face_encodings(rgb_image, boxes)
encodings = np.array(encodings)
encodings = encodings.clip(0)

if len(encodings > 0):
    classifier = SupervisedDBNClassification.load('model.pkl')
    pred = classifier.predict(encodings)
else:
    pred = ['bukandosen']


# Hasil
output = f'{pred[0]}'
print(output)
sys.stdout.flush()

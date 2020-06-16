import sys
import base64
import numpy as np
from PIL import Image
from io import BytesIO
from dbn.tensorflow import SupervisedDBNClassification


x_test = []

# Ubah input menjadi bytes
im_bytes = base64.b64decode(str.encode(sys.argv[1]))
# Ubah byte menjadi gambar
im_file = BytesIO(im_bytes)
# Ubah gambar menjadi PIL Object
img = Image.open(im_file)
# Convert ke Grayscale
img = img.convert('L')
# Convert ke Grayscale
data = np.asarray(img)
data = data.flatten()  # make 1 dimension
data = data/255  # image pixel normalization
x_test.append(data)


classifier = SupervisedDBNClassification.load('model.pkl')
pred = classifier.predict(x_test)


# Hasil
output = f'{pred[0]}'
print(output)
sys.stdout.flush()

import sys
import base64
from PIL import Image
from io import BytesIO


# with open("test.jpg", "rb") as f:
#     im_b64 = base64.b64encode(f.read())



im_bytes = base64.b64decode(str.encode(sys.argv[1]))   # im_bytes is a binary image
im_file = BytesIO(im_bytes)  # convert image to file-like object
img = Image.open(im_file)   # img is now PIL Image object
img = img.convert('L')

buffered = BytesIO()

img.save(buffered, format="JPEG")
img_str = base64.b64encode(buffered.getvalue())

print(img_str.decode('utf8'))
sys.stdout.flush()
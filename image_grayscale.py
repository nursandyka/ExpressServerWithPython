import sys
import base64
from PIL import Image
from io import BytesIO

# Ubah input menjadi bytes
im_bytes = base64.b64decode(str.encode(sys.argv[1]))
# Ubah byte menjadi gambar
im_file = BytesIO(im_bytes)
# Ubah gambar menjadi PIL Object
img = Image.open(im_file)
# Convert ke Grayscale
img = img.convert('L')
# Convert ke Grayscale
img = img.resize((64, 64))

# Alokasi tempat di memory
buffered = BytesIO()
# Simpan gambar ke memory
img.save(buffered, format="JPEG")
# Ubah gambar jadi base64
img_str = base64.b64encode(buffered.getvalue())

# Hasil
output = f'{img_str.decode("utf8")}+++{str(img.width)}+++{str(img.height)}'
print(output)
sys.stdout.flush()

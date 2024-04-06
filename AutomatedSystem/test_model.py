from tensorflow.keras.models import load_model
import cv2
import numpy as np

model = load_model("D:/nitte_model_2/model_best3.h5")

img_path ="test\images123_jpg.rf.714733bf408746cd7f209af756709e79.jpg"
img = cv2.imread(img_path)
img = cv2.resize(img,(224,224))
img = np.expand_dims(img, axis=0)
pred = model.predict(img)
print(pred)
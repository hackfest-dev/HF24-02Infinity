import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split

def get_data():
    print("hello")
    x = []
    y = []
    drowsy_path = "D:/nitte_hackathon/DDD/Drowsy"
    for image in os.listdir(drowsy_path):
        img_path = os.path.join(drowsy_path, image)
        img = cv2.imread(img_path)
        # img = cv2.resize(img, (128,128))
        x.append(img)
        y.append(int(1))
    awake_path = "D:/nitte_hackathon/DDD/Non Drowsy"
    for image in os.listdir(awake_path):
        img_path = os.path.join(awake_path, image)
        img = cv2.imread(img_path)
        # img = cv2.resize(img, (128,128))
        x.append(img)
        y.append(int(0))
    
        
    
    x = np.array(x)
    y = np.array(y)

    x_train, x_test, y_train, y_test = train_test_split(x, y, random_state=42, shuffle=True, test_size=0.2)
    print("done")
    return x_train, x_test, y_train, y_test

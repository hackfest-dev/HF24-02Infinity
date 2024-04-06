import pandas as pd
import os
import cv2
import numpy as np
from tensorflow.keras.utils import to_categorical 
import tensorflow as tf
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
  try:
    tf.config.experimental.set_virtual_device_configuration(gpus[0], [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=4000)])
  except RuntimeError as e:
    print(e)


def get_tensors():
    x_train = []
    y_train = []
    x_val = []
    y_val = []
    
    # Load training data
    x_train, y_train = gen_data("D:/nitte_hackathon/drive_data/train_annotations.csv", x_train, y_train,"D:/nitte_hackathon/drive_data/train")
    
    # Convert class labels to integers
    y_train = encode_labels(y_train)
    
    # Convert labels to one-hot encoded format
    y_train = to_categorical(y_train, num_classes=7)  # Adjust num_classes as per your dataset
    
    # Load validation data
    x_val, y_val = gen_data("D:/nitte_hackathon/drive_data/val_annotations.csv", x_val, y_val, "D:/nitte_hackathon/drive_data/valid")
    
    # Convert class labels to integers
    y_val = encode_labels(y_val)
    
    # Convert labels to one-hot encoded format
    y_val = to_categorical(y_val, num_classes=7)  # Adjust num_classes as per your dataset
    
    return x_train, y_train, x_val, y_val
    
def gen_data(csv_path, x, y, data_path):
    df = pd.read_csv(csv_path)
    for idx, row in df.iterrows():
        img_name = row["filename"]
        img_path = os.path.join(data_path, img_name)
        if os.path.exists(img_path):
            img = cv2.imread(img_path)
            img = cv2.resize(img, (224,224))
            x.append(img)
            y.append(row["class"])  
    return np.array(x), y

def encode_labels(labels):
    unique_labels = np.unique(labels)
    label_to_index = {label: idx for idx, label in enumerate(unique_labels)}
    return [label_to_index[label] for label in labels]

# Load data
x_train, y_train, x_val, y_val = get_tensors()


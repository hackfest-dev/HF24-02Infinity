import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import numpy as np

# Load the model
model_path = r"D:/nitte_hackathon/best_model.h5"
model = load_model(model_path)

# Open a video capture object
vid = cv2.VideoCapture(0)

while True:
    # Capture the video frame by frame
    ret, frame = vid.read()
    
    # Resize the frame to match the input shape expected by the model
    frame_resized = cv2.resize(frame, (128, 128))
    
    # Preprocess the input frame
    input_frame = np.expand_dims(frame_resized, axis=0)  # Add batch dimension
    
    # Perform prediction
    pred = model.predict(input_frame)
    print(pred)
    print()
  
    # Display the resulting frame
    cv2.imshow('frame', frame)
    
    # Check for quit signal
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture object and close all windows
vid.release()
cv2.destroyAllWindows()

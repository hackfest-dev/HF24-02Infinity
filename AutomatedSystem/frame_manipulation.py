import cv2
from tensorflow.keras.models import load_model 
import numpy as np

# Load the model
model_path = "D:/nitte_hackathon/model_best7.h5"
model = load_model(model_path)

# Define the class names
class_names = {0: "Class_1", 1: "Class_2", 2: "Class_3", 3: "Class_4", 4: "Class_5", 5: "Class_6", 6: "Class_7"}

#Open the video capture
vid = cv2.VideoCapture(0)

while True: 
      
    # Capture the video frame by frame 
    ret, frame = vid.read()
    
    
    # Check if the frame is None
    if not ret:
        print("Error: Unable to read frame from video source.")
        break
    
    # Resize the frame to match model's input shape (224x224)
    frame_resized = cv2.resize(frame, (224, 224))
    
    
    # Expand dimensions to match model's input shape (batch_size, 224, 224, 3)
    frame_resized = np.expand_dims(frame_resized, axis=0)
    
    # Predict the frame using the model
    pred = model.predict(frame_resized)
    
    
    # Convert numerical predictions to class names
    predicted_class = class_names[np.argmax(pred)]
    
    # Print the predicted class
    print("Predicted class:", predicted_class)
  
    # Display the resulting frame 
    cv2.imshow('frame', frame_resized[0])  # Display resized frame
    
    # Check for the 'q' button press to quit
    if cv2.waitKey(1) & 0xFF == ord('q'): 
        break
  
# Release the video capture object 
vid.release() 

# Destroy all the windows 
cv2.destroyAllWindows() 



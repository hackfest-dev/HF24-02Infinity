import cv2
import numpy as np
from tensorflow.keras.models import load_model

# Load the model
model_path = "D:/nitte_hackathon/model_best7.h5"
model = load_model(model_path)

# Define the class names
class_names = {0: "Class_1", 1: "Class_2", 2: "Class_3", 3: "Class_4", 4: "Class_5", 5: "Class_6", 6: "Class_7"}

# Open the video capture
vid = cv2.VideoCapture(0)

# Initialize variables
frame_list = []
violation_detected = False

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

while True: 
      
    # Capture the video frame by frame 
    ret, frame = vid.read()
    
    # Check if the frame is None
    if not ret:
        print("Error: Unable to read frame from video source.")
        break
    
    # Add frame to the queue
    frame_list.append(frame)
    
    # If frame_list contains 10 frames (10 seconds), process the middle frame
    if len(frame_list) == 10:
        pred_frame = frame_list[5]

        # Resize the frame to match model's input shape (224x224)
        frame_resized = cv2.resize(pred_frame, (224, 224))
        
        # Expand dimensions to match model's input shape (batch_size, 224, 224, 3)
        frame_resized = np.expand_dims(frame_resized, axis=0)
        
        # Predict the frame using the model
        pred = model.predict(frame_resized)
        
        # Check if violation is detected
        if np.any(pred > 0.5):
            violation_detected = True
        
        # If violation detected, save frames as a video
        if violation_detected:
            for image in frame_list:
                out.write(image)
            
            print("Violation detected! Video saved.")
            
            # Reset violation detection flag and frame list
            violation_detected = False
            frame_list = []
        
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

# Release the VideoWriter object
out.release()

# Destroy all the windows 
cv2.destroyAllWindows()

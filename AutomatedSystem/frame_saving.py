import cv2
import numpy as np
from tensorflow.keras.models import load_model

model_path = "model_best3.h5"
model = load_model(model_path)
frame_list = []
anomaly_types = {0: "Mobile", 1: "Cigar", 2: "SeatBelt"}
output_filename = "anomaly_frames.avi"  # Specify the output video filename
frame_count = 0
frame_width, frame_height = None, None

# Define the video codec and create a VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = None

# Define a function to save frames to video
def save_frames_to_video(frames):
    global out
    if out is None:
        # Initialize VideoWriter with frame dimensions
        frame_height, frame_width, _ = frames[0].shape
        out = cv2.VideoWriter(output_filename, fourcc, 25, (frame_width, frame_height))
    for frame in frames:
        out.write(frame)

# Define a function to reset the video writer
def reset_video_writer():
    global out
    if out is not None:
        out.release()
        out = None

# Define a video capture object
vid = cv2.VideoCapture(0)

while True:
    # Capture the video frame
    ret, frame = vid.read()

    # Display the resulting frame
    cv2.imshow('frame', frame)

    # Add the frame to the frame list
    frame_list.append(frame)
    
    # If 21 frames have been captured
    if len(frame_list) == 201:
        d_frame = frame_list[100]
        d_frame = cv2.resize(d_frame, (224, 224))
        d_frame = np.expand_dims(d_frame, axis=0)
        pred = model.predict(d_frame)
        
        # If anomaly is detected
        if np.any(pred) > 0.60:
            cat_index = np.argmax(pred)
            anomaly_type = anomaly_types[cat_index]
            print(f"Anomaly detected: {anomaly_type}")
            save_frames_to_video(frame_list)  # Save frames to video
            reset_video_writer()
            frame_list = []  # Reset the video writer
        else:
            frame_list = []  # Clear the frame list

    # Check if the 'q' button is pressed to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object
vid.release()

# Release the video writer
reset_video_writer()

# Destroy all windows
cv2.destroyAllWindows()

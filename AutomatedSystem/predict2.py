from  tensorflow.keras.models import load_model
import cv2
import numpy as np

model_path = "D:/nitte_model_2/model_best3.h5"
model = load_model(model_path)

import cv2 
  
  
# define a video capture object 
vid = cv2.VideoCapture(0) 
  
while(True): 
      
    # Capture the video frame 
    # by frame 
    ret, frame = vid.read() 
  
    # Display the resulting frame 
    cv2.imshow('frame', frame) 
    frame = cv2.resize(frame, (224,224))
    frame = np.expand_dims(frame, axis=0)
    pred = model.predict(frame)
    print(pred)
      
    # the 'q' button is set as the 
    # quitting button you may use any 
    # desired button of your choice 
    if cv2.waitKey(1) & 0xFF == ord('q'): 
        break
  
# After the loop release the cap object 
vid.release() 
# Destroy all the windows 
cv2.destroyAllWindows() 
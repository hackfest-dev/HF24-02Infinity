from tensorflow.keras import Sequential
from tensorflow.keras.layers import Input, Conv2D, Flatten, InputLayer, MaxPooling2D
from tensorflow.keras.layers import MaxPool2D, BatchNormalization, Dropout, Dense, GlobalAveragePooling2D
from tensorflow.keras.layers import Resizing, Rescaling 
from tensorflow.keras.applications import ResNet50

def get_model():
    model = Sequential()
    model.add(Conv2D(input_shape=(128,128,3),filters=64,kernel_size=(3,3),padding="same", activation="relu"))
    model.add(Conv2D(filters=64,kernel_size=(3,3), activation="relu"))
    model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
    model.add(Conv2D(filters=128, kernel_size=(3,3),  activation="relu"))
    model.add(Conv2D(filters=128, kernel_size=(3,3),  activation="relu"))
    model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
    model.add(Conv2D(filters=256, kernel_size=(3,3),  activation="relu"))
    model.add(Conv2D(filters=256, kernel_size=(3,3),  activation="relu"))
    model.add(Conv2D(filters=256, kernel_size=(3,3), activation="relu"))
    model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
    model.add(Flatten())
    
    model.add(Dense(units=512,activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(units = 256, activation = "relu"))
    model.add(Dense(units=1,activation="sigmoid"))

    
    
    
    
    
    return model





    
    


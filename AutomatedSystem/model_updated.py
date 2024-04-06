from tensorflow.keras.applications import VGG16
from tensorflow.keras import Sequential 
from tensorflow.keras.layers import Dense, Dropout

def get_3_class_model():
    model = Sequential()
    model.add(VGG16(include_top = "False", weights= "imagenet"))
    for layer in model.layers:
        layer.trainable = False

    model.add(Dropout(0.2))
    model.add(Dense(128, activation = "relu"))
    model.add(Dropout(0.2))
    model.add(Dense(3, activation ="softmax"))
    return model

model = get_3_class_model()
print(model.summary())

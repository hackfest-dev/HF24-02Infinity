from dataset_prep import get_tensors
from model7 import get_7_class_model

x_train, y_train, x_val, y_val = get_tensors()
model = get_7_class_model()
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])
model.fit(x_train, y_train, validation_data = (x_val, y_val),epochs =5)
model.save("model_best7.h5")
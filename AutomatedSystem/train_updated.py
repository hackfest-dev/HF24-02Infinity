from dataset_prep import get_tensors
from model_updated import get_3_class_model

x_train, y_train, x_val, y_val = get_tensors()
model = get_3_class_model()
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])
model.fit(x_train, y_train, validation_data = (x_val, y_val),epochs =10)
model.save("model_best3.h5")
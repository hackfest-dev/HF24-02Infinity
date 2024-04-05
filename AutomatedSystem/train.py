from tensorflow.keras.callbacks import ModelCheckpoint
from dataset_preperation import get_data
from model import get_model
from tensorflow.keras.callbacks import ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam

import tensorflow as tf

# Get the current GPU device and release its memory
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)


# Load data
x_train, x_val, y_train,  y_val = get_data()
print("Data loaded")

# Create and compile model
model = get_model()  # Pass input shape to automatically build the model
model.compile(optimizer=Adam(learning_rate= 0.001), loss='binary_crossentropy', metrics=['accuracy'])

# Define checkpoint callback to save the best model based on validation accuracy
checkpoint_path = "best_model.h5"
checkpoint_callback = ModelCheckpoint(filepath=checkpoint_path,
                                      monitor='val_accuracy',
                                      verbose=1,
                                      save_best_only=True,
                                      save_weights_only=False,
                                      mode='max')
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.2,
                              patience=5, min_lr=0.001)

# Fit the model to the data
model.fit(x_train, y_train,
          validation_data=(x_val, y_val),
          epochs=15,
          callbacks=[checkpoint_callback])

# The best model based on validation accuracy has been saved to "best_model.h5"

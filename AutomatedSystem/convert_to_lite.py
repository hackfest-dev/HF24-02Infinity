import tensorflow as tf

# Load the Keras model from .h5 file
keras_model = tf.keras.models.load_model('D:/nitte_hackathon/best_model.h5')

# Convert the Keras model to TensorFlow Lite format
converter = tf.lite.TFLiteConverter.from_keras_model(keras_model)
tflite_model = converter.convert()

# Save the TensorFlow Lite model to disk
with open('converted_model.tflite', 'wb') as f:
    f.write(tflite_model)
print("Done")

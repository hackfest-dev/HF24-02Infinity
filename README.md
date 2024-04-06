# Deep Learning Truck Driver Monitoring System

## Overview

This repository contains code for an automated system designed to monitor truck drivers using deep learning techniques. The system aims to detect whether the driver is wearing a seatbelt, smoking, or using a phone while driving. It utilizes Python 3.10 along with TensorFlow 2.10 for model development and inference.

## Requirements

- Python 3.10
- TensorFlow 2.10
- opencv-python

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/truck-driver-monitoring.git
   cd truck-driver-monitoring
** Dataset**
   Ensure you have a labeled dataset containing images of truck drivers categorized into seatbelt, smoking, and phone_usage classes.
   
**Model Architecture:**
Utilized VGG16 architecture for classification.
Pre-trained weights from ImageNet used to expedite training.
Adapted to the specific classification problem of seatbelt, smoking, and phone usage detection.

**Challenges and Solutions:**
Limited GPU memory on laptop posed challenges for model training.
Leveraged pre-trained weights from ImageNet to mitigate memory constraints.
Pre-trained weights helped achieve faster convergence with fewer iterations.

**Future Work:**
Hyperparameter tuning for improved accuracy.
Extension to detect additional driver behaviors.
Integration with existing monitoring systems.

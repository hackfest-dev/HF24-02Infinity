# Old repo which has all the codes which were added before transfering the code to the hackfest repo

https://github.com/Gowrish7/nitte-hackathon.git

**Introduction**
Welcome, Our aim is to revolutionize the logistics industry by creating a comprehensive platform for hiring trucks and optimizing the workflow. Through the integration of deep learning technologies, a user-friendly website, and a versatile Flutter mobile application, we seek to provide significant benefits to truck drivers, owners, and end customers alike.

**Project Overview**
Proposed project  is a multi-faceted solution designed to streamline the process of hiring trucks while enhancing efficiency and profitability for all stakeholders involved. The platform consists of three main components:

**1. Deep Learning**
Our deep learning component is specifically tailored to detect and analyze driver behavior in real-time. By leveraging advanced algorithms, the system can identify signs of drowsiness, smoking, or mobile phone usage. This proactive approach to monitoring helps to ensure driver safety, reduce the risk of accidents, and promote compliance with safety regulations.

**2. Website**
The LogisticsOptimize website serves as the primary interface for users to access the platform's features. Through an intuitive and user-friendly design, customers can easily request truck services, track shipments, view pricing information, and manage their accounts. Additionally, truck owners and drivers can register, update their availability, and monitor performance metrics to maximize their earning potential.

**3. Flutter App**
Complementing the website, our Flutter mobile application extends the functionality of LogisticsOptimize to users on the go. With cross-platform compatibility and seamless integration with the web platform, the app provides convenience and accessibility for both customers and truck operators. Users can access the full range of features, including real-time tracking, notifications, and instant booking capabilities, directly from their smartphones or tablets.

**Key Features**

**Route Optimization:** Efficiently plan truck routes to minimize fuel consumption and delivery times.

**Instant Booking: **Enable customers to book truck services instantly through the website and mobile app.

**Real-Time Tracking:** Provide real-time tracking of shipments for improved visibility and transparency.

**Driver Performance Metrics:** Empower drivers with insights into their performance and earnings, fostering accountability and motivation.

**User Authentication and Security:** Implement robust authentication mechanisms to ensure data privacy and prevent unauthorized access.

**Feedback and Rating System:** Enable users to provide feedback and ratings, facilitating continuous improvement and trust-building within the community.




# Deep Learning Truck Driver Monitoring System

## Overview

This repository contains code for an automated system designed to monitor truck drivers using deep learning techniques. The system aims to detect whether the driver is wearing a seatbelt, smoking, or using a phone while driving. It utilizes Python 3.10 along with TensorFlow 2.10 for model development and inference.

## Requirements

- Python 3.10
- TensorFlow 2.10
- opencv-python

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

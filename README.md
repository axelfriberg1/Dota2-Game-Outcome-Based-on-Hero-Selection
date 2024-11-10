# Dota 2 Winner Predictor

This project is a web-based application built with Flask, XGBoost, and JavaScript, HTML, CSS which predicts the winning team in a Dota 2 match based on selected heroes. It provides a simple UI to select heroes for two teams and uses an XGBoost model to make the prediction.
NOTE!!! The models accuracy is poor, do not expect good predictions.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Endpoints](#endpoints)
6. [Dependencies](#dependencies)

## Features

- Simple hero selection for two teams.
- Predicts the winning team using a pre-trained XGBoost model.
- Frontend UI with dropdown hero selectors and a submit button.
- Displays predicted winning team based on the model's output.

## Project Structure

```plaintext
Dota2Predictor/
├── app.py                     # Flask application
├── best_model.json            # Pre-trained XGBoost model
├── templates/
│   └── index.html             # Main HTML file for the web app
├── static/
│   ├── index.js               # JavaScript for frontend logic
│   └── index.css              # CSS for styling
└── README.md                  # Project README file
```
## Setup and Installation

Follow these steps to set up the project locally.

1. Clone the Repository

- git clone https://github.com/yourusername/Dota2Predictor.git
- cd Dota2-Game-Outcome-Based-on-Hero-Selection

2. Create a Virtual Environment

- python3 -m venv venv

3. Activate the Virtual Environment

macOS/Linux:
- source venv/bin/activate

Windows:
- venv\Scripts\activate

## Running the Application

To run the application, ensure the virtual environment is activated, then execute:
- python app.py

## Endpoints

1. /: The main page for hero selection and prediction.
2. /predict: Endpoint to submit the selected heroes and receive the prediction.

## Dependencies

All required dependencies can be installed using:
- pip install -r requirements.txt
- Flask
- XGBoost
- JavaScript (for frontend interactions)


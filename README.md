# Dota 2 Winner Predictor

This project is a web-based application built with Flask, XGBoost, and JavaScript, which predicts the winning team in a Dota 2 match based on selected heroes. It provides a simple UI to select heroes for two teams and uses an XGBoost model to make the prediction.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Endpoints](#endpoints)
6. [Usage](#usage)
7. [Dependencies](#dependencies)

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

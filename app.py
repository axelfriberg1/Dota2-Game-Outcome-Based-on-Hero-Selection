from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import xgboost as xgb
import pandas as pd
# Load the saved model
loaded_model = xgb.Booster()
loaded_model.load_model('best_model.json')  # or 'best_model.ubj'

# List of hero names, assuming these are the same names used in your training data
hero_columns = [
    "Anti-Mage", "Axe", "Bane", "Bloodseeker", "Crystal Maiden", "Drow Ranger", "Earthshaker", 
    "Juggernaut", "Mirana", "Morphling", "Shadow Fiend", "Phantom Lancer", "Puck", "Pudge", 
    "Razor", "Sand King", "Storm Spirit", "Sven", "Tiny", "Vengeful Spirit", "Windranger", 
    "Zeus", "Kunkka", "Lina", "Lion", "Shadow Shaman", "Slardar", "Tidehunter", "Witch Doctor", 
    "Lich", "Riki", "Enigma", "Tinker", "Sniper", "Necrophos", "Warlock", "Beastmaster", 
    "Queen of Pain", "Venomancer", "Faceless Void", "Skeleton King", "Death Prophet", 
    "Phantom Assassin", "Pugna", "Templar Assassin", "Viper", "Luna", "Dragon Knight", "Dazzle", 
    "Clockwerk", "Leshrac", "Nature's Prophet", "Lifestealer", "Dark Seer", "Clinkz", "Omniknight", 
    "Enchantress", "Huskar", "Night Stalker", "Broodmother", "Bounty Hunter", "Weaver", "Jakiro", 
    "Batrider", "Chen", "Spectre", "Ancient Apparition", "Doom", "Ursa", "Spirit Breaker", 
    "Gyrocopter", "Alchemist", "Invoker", "Silencer", "Outworld Devourer", "Lycanthrope", 
    "Brewmaster", "Shadow Demon", "Lone Druid", "Chaos Knight", "Meepo", "Treant Protector", 
    "Ogre Magi", "Undying", "Rubick", "Disruptor", "Nyx Assassin", "Naga Siren", "Keeper of the Light", 
    "Wisp", "Visage", "Slark", "Medusa", "Troll Warlord", "Centaur Warrunner", "Magnus", 
    "Timbersaw", "Bristleback", "Tusk", "Skywrath Mage", "Abaddon", "Elder Titan", 
    "Legion Commander", "Techies", "Ember Spirit", "Earth Spirit", "Terrorblade", "Phoenix", 
    "Oracle", "Winter Wyvern", "Arc Warden"
]

app = Flask(__name__) 
CORS(app)


@app.route("/") 
def index(): 
    return render_template('index.html') 

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    team1_heroes = data.get("team1_heroes", [])
    team2_heroes = data.get("team2_heroes", [])

    # Empty dataframe with correct hero columns
    new_data_point = pd.DataFrame(np.zeros((1, len(hero_columns))), columns=hero_columns)
    print(new_data_point.shape)

    # Set the hero columns based on the teams (1 for team1, -1 for team2)
    for hero in team1_heroes:
        if hero in new_data_point.columns:
            new_data_point[hero] = 1
    for hero in team2_heroes:
        if hero in new_data_point.columns:
            new_data_point[hero] = -1
    
    # Convert to DMatrix
    # Info about DMatrix here: https://xgboost.readthedocs.io/en/stable/python/python_intro.html
    dmatrix_new_data = xgb.DMatrix(new_data_point)
    print(dmatrix_new_data)


    # Use model to predict class of the new datapoint
    y_pred_proba = loaded_model.predict(dmatrix_new_data)
    y_pred_label = (y_pred_proba >= 0.5).astype(int)

    # set response value to 0 or 1 based on outcome
    if (y_pred_label[0] == 0):
        result = "team2"
    else:
        result = "team1"

    return jsonify(result=result)



if __name__ == "__main__":
    app.run(debug=True)

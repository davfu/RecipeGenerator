from flask import render_template, request, jsonify
from app import app
from server.app.functions.recipes_filters import get_recipes_filter

@app.route("/")
def index(): 
    return render_template("index.html")

# modify to take ingredients when necessary (figure out how to route properly)
@app.route("/recipes", methods=["POST"])
def recipes():
    recipe_list = get_recipes_filter(request.form)
    recipes_json = [{'id': id,
                     'name': name, 
                     'url': url, 
                     'cals': cals, 
                     'carbs': carbs, 
                     'fat': fat,
                     'protein': protein,
                     'num_ing': num_ing,
                     'rating': rating,
                     'num_rev': num_rev,
                     'img_url': img_url,
                     'time': time} for id, name, url, cals, carbs, fat, protein, num_ing, rating, num_rev, img_url, time in recipe_list] # make recipes json
    return jsonify(recipes_json)

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/signup')
def signup():
    return render_template("signup.html")
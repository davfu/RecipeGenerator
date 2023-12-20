from flask import render_template, request, jsonify
from app import app
from app.functions.filter import get_recipes

# FILTERS = {}

@app.route("/")
def index(): 
    return render_template("index.html")

@app.route("/recipes", methods=["POST"])
def recipes():
    form = request.form
    recipe_list = get_recipes(form)
    recipes_json = [{'name': name, 'url': url} for name, url in recipe_list]
    return jsonify(recipes_json)
    #return render_template("recipes.html", lst_recipes=recipe_list)

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/signup')
def signup():
    return render_template("signup.html")
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
    lst_recipes = get_recipes(form)
    print(lst_recipes)
    return render_template("recipes.html", lst_recipes=lst_recipes)

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/signup')
def signup():
    return render_template("signup.html")
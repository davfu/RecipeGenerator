# models.py
from app import db

# table for storing recipes using object-relational mapping
class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), unique=True)
    title = db.Column(db.String(255))
    rating = db.Column(db.Float)
    rev_count = db.Column(db.Integer)
    ingredients = db.Column(db.Text)
    num_ingredients = db.Column(db.Integer)
    cals = db.Column(db.Integer)  # Assuming calories are represented as integers
    protein = db.Column(db.Integer)  # Assuming protein is represented as integers
    carbs = db.Column(db.Integer)  # Assuming carbs are represented as integers
    fat = db.Column(db.Integer)  # Assuming fat is represented as integers
    image_url = db.Column(db.String(255), unique=True)
    time = db.Column(db.Integer)

# table for all the ingredients and the count in terms of
# how many times they appear in all recipes
class Ingredients(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    count = db.Column(db.Integer)

# NEED TO FIGURE OUT
# many to many junction table that maps the ingredients to recipes
class Recipe_to_Ingredients(db.Model):
    __tablename__ = 'recipe_ingredients'
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), primary_key=True)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), primary_key=True)

    # relationship to reference the Recipe and Ingredients tables
    # recipe = db.relationship('recipes')
    # ingredient = db.relationship('ingredients')
    
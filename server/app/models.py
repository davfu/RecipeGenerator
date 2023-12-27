# models.py
from app import db

# data base table for storing recipes using object-relational mapping
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
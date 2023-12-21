from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)
app.config.from_object(Config)

db = SQLAlchemy(app)

from app import routes, models
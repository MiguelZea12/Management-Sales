from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from app.utils.error_handler import handle_error
from os import environ

app = Flask(__name__)

if environ.get("ENVIRONMENT") == "PROD":
    app.config.from_object("app.config.ProductionConfig")
else:
    app.config.from_object("app.config.DevelopmentConfig")
CORS(app)

with app.app_context():
    from app.extensions import db
    from app.models.declarative_base import DeclarativeBase
    from app.models import *
    from app.controllers import *

    app.register_error_handler(Exception, handle_error)
    db.init_app(app)
    DeclarativeBase.metadata.create_all(db.engine, checkfirst=True)


#: Registro de Blueprints
from app.controllers import __blueprints__

for blueprint in __blueprints__:
    print("Registering Blueprint: {}".format(blueprint.name))
    app.register_blueprint(blueprint)


@app.route("/", methods=["GET"])
def home():
    return render_template("layout.html")

@app.route('/api/hello', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask!'})




from os import environ, path
from datetime import timedelta


class config(object):
    SECRET_KEY = environ.get("SECRET_KEY")
    CORS_HEADERS = "Content-Type"
    PROPAGATE_EXCEPTIONS = True


class DevelopmentConfig(config):
    DEBUG = True
    FLASK_DEBUG = 1
    SQLALCHEMY_DATABASE_URI = environ.get("DEV_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProductionConfig(config):
    DEBUG = False
    FLASK_DEBUG = 0
    SQLALCHEMY_DATABASE_URI = environ.get("PROD_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

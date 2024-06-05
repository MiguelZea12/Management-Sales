from app.extensions import db
from app.models.declarative_base import DeclarativeBase
from app.utils.utilities import timeNowTZ
from sqlalchemy.dialects.postgresql import JSONB


class product (DeclarativeBase):
    __tablename__ = "Product"
    id = db.Column(db.Integer, primary_key=True)
    names = db.Column(db.String(100), nullable = False)
    descriptions = db.Column(db.String(100), nullable = True)
    price = db.Column(db.Float, nullable = False)
    stock = db.Column(db.Integer, nullable = False)
    status = db.Column(db.Boolean, nullable=False)
    user_cration_id = db.Column(db.Integer, nullable=False)
    user_modification_id = db.Column(db.Integer)
    creation_date = db.Column(db.DateTime, nullable=True, default=timeNowTZ)
    modification_date = db.Column(db.DateTime)

    def __init__ (self, names, descriptions, status):
        self.names = names
        self.descripcion = descriptions
        self.status = status

    
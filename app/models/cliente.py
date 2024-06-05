
from app.extensions import db
from app.models.declarative_base import DeclarativeBase
from app.utils.utilities import timeNowTZ
from sqlalchemy.dialects.postgresql import JSONB


class Client(DeclarativeBase):
    __tablename__ = "Client"
    id = db.Column(db.Integer, primary_key=True)
    names = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Boolean, nullable=False)
    user_cration_id = db.Column(db.Integer, nullable=False)
    user_modification_id = db.Column(db.Integer)
    creation_date = db.Column(db.DateTime, nullable=True, default=timeNowTZ)
    modification_date = db.Column(db.DateTime)

    def __init__(self, names, email, telefono, status
                ):
        self.names = names
        self.email = email
        self.telefono = telefono
        self.status = status
       
       
        




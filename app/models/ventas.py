from app.extensions import db
from app.models.declarative_base import DeclarativeBase
from app.utils.utilities import timeNowTZ
from sqlalchemy.dialects.postgresql import JSONB


class Sales(DeclarativeBase):
    __tablename__ = "Sale"
    id = db.Column(db.Integer, primary_key=True)
    id_client = db.Column(db.Integer, db.ForeignKey('Client.id'))
    date = db.Column(db.DateTime, nullable=True, default=timeNowTZ)
    status = db.Column(db.Boolean, nullable=False)
    user_cration_id = db.Column(db.Integer, nullable=False)
    user_modification_id = db.Column(db.Integer)
    creation_date = db.Column(db.DateTime, nullable=True, default=timeNowTZ)
    modification_date = db.Column(db.DateTime)

    def __init__ (self, id_client, date, status, user_cration_id):
        self.id_client = id_client
        self.date = date
        self.status = status
        self.user_cration_id = user_cration_id

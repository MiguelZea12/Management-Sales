from app.extensions import db
from app.models.declarative_base import DeclarativeBase
from app.utils.utilities import timeNowTZ
from sqlalchemy.dialects.postgresql import JSONB


class SaleDescription(DeclarativeBase):
    __tablename__ = "SaleDescription"
    id = db.Column(db.Integer, primary_key=True)
    id_sale = db.Column(db.Integer, db.ForeignKey('Sale.id'))
    id_product = db.Column(db.Integer, db.ForeignKey('Product.id'))
    count = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    status = db.Column(db.Boolean, nullable=False)
    user_cration_id = db.Column(db.Integer, nullable=False)
    user_modification_id = db.Column(db.Integer)
    creation_date = db.Column(db.DateTime, nullable=True, default=timeNowTZ)
    modification_date = db.Column(db.DateTime)

    def __init__ (self, id_sale, id_product, count, price, status):
        self.id_sale = id_sale
        self.id_product = id_product
        self.count = count
        self.price = price
        self.status = status
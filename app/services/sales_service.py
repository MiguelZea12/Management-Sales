from app.models.ventas import ventas
from app.schemas.ventas_schemas import SaleSchemas
from app.extensions import db

def get(id: int):
    sale_object = db.session.query(ventas).filter(ventas.id == id).first()
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object)

def get_all():
    sale_objects = db.session.query(ventas).all()
    sale_schema = SaleSchemas(many=True)
    return sale_schema.dump(sale_objects)

def create(id_cliente: int, fecha: str):
    sale_object = ventas(
        id_cliente=id_cliente,
        fecha=fecha
    )
    db.session.add(sale_object)
    db.session.commit()
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object)

def update(id: int, data: dict):
    sale_object = db.session.query(ventas).filter(ventas.id == id).first()
    for key, value in data.items():
        setattr(sale_object, key, value)
    db.session.commit()
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object)

def delete(id: int):
    sale_object = db.session.query(ventas).filter(ventas.id == id).first()
    db.session.delete(sale_object)
    db.session.commit()

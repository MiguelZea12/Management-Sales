from app.models.sale_description import SaleDescription
from app.schemas.sale_description_schemas import SalesDescriptionSchemas
from app.extensions import db

def get(id: int):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object)

def get_all():
    detail_objects = db.session.query(SaleDescription).all()
    detail_schema = SalesDescriptionSchemas(many=True)
    return detail_schema.dump(detail_objects)

def create(id_venta: int, id_producto: int, cantidad: int, precio: float):
    detail_object = SaleDescription(
        id_venta = id_venta,
        id_producto = id_producto,
        cantidad = cantidad,
        precio = precio,
        user_cration_id = 1,
    )
    db.session.add(detail_object)
    db.session.commit()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object)

def update(id: int, data: dict):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    for key, value in data.items():
        setattr(detail_object, key, value)
    db.session.commit()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object)

def delete(id: int):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    db.session.delete(detail_object)
    db.session.commit()

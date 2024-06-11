from app.models.sale_description import SaleDescription
from app.schemas.sale_description_schemas import SalesDescriptionSchemas
from app.extensions import db

def get(id: int):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object)

def get_sale_details(sale_id: int):
    sale_details = db.session.query(SaleDescription).filter(SaleDescription.id_sale == sale_id).all()
    sale_description_schema = SalesDescriptionSchemas(many=True)
    serialized_details = sale_description_schema.dump(sale_details)
    return serialized_details

def create(id_sale: int, id_product: int, count: int, price: float):
    detail_object = SaleDescription(
        id_sale=id_sale,
        id_product=id_product,
        count=count,
        price=price,
        status=True,
        user_cration_id=1,
    )
    db.session.add(detail_object)
    db.session.commit()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object), 201

def update(id: int, id_sale: int, id_product: int, count: int, price: float):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    if not detail_object:
        return {'message': 'Detail not found'}, 404
    detail_object.id_sale = id_sale
    detail_object.id_product = id_product
    detail_object.count = count
    detail_object.price = price
    db.session.commit()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object), 200

def delete(id: int):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    if not detail_object:
        return {'message': 'Detail not found'}, 404
    db.session.delete(detail_object)
    db.session.commit()
    return {'message': 'Detail deleted'}, 204

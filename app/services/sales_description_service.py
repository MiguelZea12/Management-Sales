from app.models.sale_description import SaleDescription
from app.schemas.sale_description_schemas import SalesDescriptionSchemas
from app.models.product import Product
from app.extensions import db
from flask import abort

def get(id: int):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id == id).first()
    detail_schema = SalesDescriptionSchemas()
    return detail_schema.dump(detail_object)


def get_sale_details(sale_id: int):
    sale_details = db.session.query(SaleDescription).filter(SaleDescription.id_sale == sale_id).all()
    sale_description_schema = SalesDescriptionSchemas(many=True)
    serialized_details = sale_description_schema.dump(sale_details)
    return serialized_details

def get_all():
    detail_query = db.session.query(SaleDescription).filter(SaleDescription.status == True).all()
    detail_with_product_name = []
    for product in detail_query:
        product_object = db.session.query(Product).filter(Product.id == product.id_product).first()
        detail_dict = SalesDescriptionSchemas().dump(product)
        detail_dict['product_name'] = product_object.names
        detail_with_product_name.append(detail_dict)
    return detail_with_product_name

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

def update_detail(id: int, data: dict):
    detail_object = db.session.query(SaleDescription).filter(SaleDescription.id_sale == id).first()
    if detail_object is None:
        abort(404)  # Devuelve un error 404 si el detalle no se encuentra
    for key, value in data.items():
        setattr(detail_object, key, value)
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

from app.models.ventas import Sales 
from app.models.sale_description import SaleDescription
from app.schemas.ventas_schemas import SaleSchemas
from app.models.cliente import Client
from app.schemas.sale_description_schemas import SalesDescriptionSchemas
from app.extensions import db

def get(id: int):
    sale_object = db.session.query(Sales).filter(Sales.id == id).first()
    if sale_object is None:
        return {"message": "Sale not found"}, 404
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object), 200

def get_all():
    sale_objects = db.session.query(Sales).all()  
    sale_with_client_name = []
    for sale in sale_objects:
        client_object = db.session.query(Client).filter(Client.id == sale.id_client).first()
        sale_dict = SaleSchemas().dump(sale)
        sale_dict['client_name'] = client_object.names
        sale_with_client_name.append(sale_dict)
    return sale_with_client_name

def create_sale(id_client: str, date: str, status: bool, details: list):
    new_sale = Sales(
        id_client=id_client,
        date=date,
        status=status,
        user_cration_id=1,
    )
    db.session.add(new_sale)
    db.session.flush()

    new_sale_details = []
    for detail_data in details:
        id_product = detail_data.get('id_product')
        count = detail_data.get('count')
        price = detail_data.get('price')

        if id_product and count and price:
            detail = SaleDescription(
                id_sale=new_sale.id,
                id_product=id_product,
                count=count,
                price=price,
                status=status,
                user_cration_id=1,
            )
            db.session.add(detail)
            new_sale_details.append(detail)

    db.session.commit()

    sale_schema = SaleSchemas()
    sale_description_schema = SalesDescriptionSchemas(many=True)
    serialized_sale = sale_schema.dump(new_sale)
    serialized_details = sale_description_schema.dump(new_sale_details)
    serialized_sale['details'] = serialized_details

    return serialized_sale

def update(id: int, data: dict):
    sale_object = db.session.query(Sales).filter(Sales.id == id).first()
    if sale_object is None:
        return {"message": "Sale not found"}, 404
    for key, value in data.items():
        setattr(sale_object, key, value)
    db.session.commit()
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object), 200

def delete(id: int):
    sale_object = db.session.query(Sales).filter(Sales.id == id).first()
    if sale_object is None:
        return {"message": "Sale not found"}, 404
    db.session.delete(sale_object)
    db.session.commit()
    return {"message": "Sale deleted successfully"}, 200

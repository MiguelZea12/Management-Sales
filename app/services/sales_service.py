from app.models.ventas import Sales
from app.schemas.ventas_schemas import SaleSchemas
from app.extensions import db

def get(id: int):
    sale_object = db.session.query(Sales).filter(Sales.id == id).first()
    if sale_object is None:
        return {"message": "Sale not found"}, 404
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object), 200

def get_all():
    sale_objects = db.session.query(Sales).filter(Sales.status == True).all()
    sale_schema = SaleSchemas(many=True)
    sales = sale_schema.dump(sale_objects)
    print(sales)  # Agrega este log para verificar los datos
    return sales

def create(id_client: int, date: str, status: bool):
    sale_object = Sales(
        id_client=id_client,
        date=date,
        status=status,
        user_cration_id=1
    )
    db.session.add(sale_object)
    db.session.commit()
    sale_schema = SaleSchemas()
    return sale_schema.dump(sale_object), 201

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


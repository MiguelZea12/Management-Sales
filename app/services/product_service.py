from app.models.product import product
from app.schemas.product_schemas import ProductSchemas
from app.extensions import db

def get(id: int):
    product_object = db.session.query(product).filter(product.id == id).first()
    product_schema = ProductSchemas()
    return product_schema.dump(product_object)

def get_all():
    product_objects = db.session.query(product).filter(product.status == True).all()
    return product_objects

def create(names: str, descriptions: str, price: float, stock: int, status: bool):
    product_object = product(
        names=names,
        descriptions=descriptions,
        price=price,
        stock=stock,
        status=status,
        user_cration_id=1
    )
    db.session.add(product_object)
    db.session.commit()
    product_schema = ProductSchemas()
    return product_schema.dump(product_object)

def update(id: int, data: dict):
    product_object = db.session.query(product).filter(product.id == id).first()
    for key, value in data.items():
        setattr(product_object, key, value)
    db.session.commit()
    product_schema = ProductSchemas()
    return product_schema.dump(product_object)

def delete(id: int):
    product_object = db.session.query(product).filter(product.id == id).first()
    db.session.delete(product_object)
    db.session.commit()

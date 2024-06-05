from app.models.product import product
from app.schemas.product_schemas import ProductSchemas
from app.extensions import db

def get(id: int):
    product_object = db.session.query(product).filter(product.id == id).first()
    product_schema = ProductSchemas()
    return product_schema.dump(product_object)

def get_all():
    product_objects = db.session.query(product).all()
    product_schema = ProductSchemas(many=True)
    return product_schema.dump(product_objects)

def create(nombre: str, descripcion: str, precio: float, stock: int):
    product_object = product(
        nombre=nombre,
        descripcion=descripcion,
        precio=precio,
        stock=stock
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

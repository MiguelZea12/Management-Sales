from app.models.product import Product
from app.extensions import db
from app.schemas.product_schemas import ProductSchemas

def get(id: int):
    product_object = db.session.query(Product).filter(Product.id == id, Product.status == True).first()
    if product_object is None:
        return {"message": "Product not found"}, 404
    product_schema = ProductSchemas()
    return product_schema.dump(product_object), 200

def get_all():
    product_objects = db.session.query(Product).filter(Product.status == True).all()
    product_schema = ProductSchemas(many=True)
    return product_schema.dump(product_objects)

def create(names: str, descriptions: str, price: float, stock: int, status: bool):
    new_product = Product(
        names=names,
        descriptions=descriptions,
        price=price,
        stock=stock,
        status=status,
        user_creation_id=1
    )
    db.session.add(new_product)
    db.session.commit()
    product_schema = ProductSchemas()
    return product_schema.dump(new_product)

def update(id: int, data: dict):
    product = db.session.query(Product).filter(Product.id == id).first()
    if product is None:
        return {"message": "Product not found"}, 404
    for key, value in data.items():
        setattr(product, key, value)
    db.session.commit()
    product_schema = ProductSchemas()
    return product_schema.dump(product), 200

def delete(id: int):
    product = db.session.query(Product).filter(Product.id == id).first()
    db.session.delete(product)
    db.session.commit()

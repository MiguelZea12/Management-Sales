from app.models.sale_description import SaleDescription as SaleDetail
from app.schemas.sale_description_schemas import SalesDescriptionSchemas
from app.extensions import db

def get_sale_details_by_sale_id(sale_id):
    return SaleDetail.query.filter_by(sale_id=sale_id).all()

def create_sale_detail(data):
    sale_detail = SaleDetail(**data)
    db.session.add(sale_detail)
    db.session.commit()

def update_sale_detail(sale_id, data):
    sale_detail = SaleDetail.query.filter_by(sale_id=sale_id).first()
    for key, value in data.items():
        setattr(sale_detail, key, value)
    db.session.commit()

def delete_sale_detail(sale_id):
    SaleDetail.query.filter_by(sale_id=sale_id).delete()
    db.session.commit()
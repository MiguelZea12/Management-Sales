from marshmallow import fields

from app.schemas.base_schema import BaseSchema

class SalesDescriptionSchemas(BaseSchema):
    id = fields.Int()
    id_sale = fields.Int()
    id_product = fields.Int()
    count = fields.Int()
    price = fields.Float()
    status = fields.Bool()
    user_creation_id = fields.Int()
    user_modification_id = fields.Int()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()
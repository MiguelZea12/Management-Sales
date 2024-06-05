from marshmallow import fields

from app.schemas.base_schema import BaseSchema


class ProductSchemas (BaseSchema):
    product_id = fields.Int(dump_only=True)
    name = fields.String()
    description = fields.String()
    price = fields.Float()
    stock = fields.Int()
    status = fields.Boolean()
    user_creation_id = fields.Integer()
    user_modification_id = fields.Integer()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()
from marshmallow import fields

from app.schemas.base_schema import BaseSchema

class SalesDescriptionSchemas (BaseSchema):
    sale_description_id = fields.Int(dump_only=True)
    sale_id = fields.Int()
    product_id = fields.Int()
    quantity = fields.Int()
    total = fields.Float()
    status = fields.Boolean()
    user_creation_id = fields.Integer()
    user_modification_id = fields.Integer()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()
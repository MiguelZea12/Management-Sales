from marshmallow import fields

from app.schemas.base_schema import BaseSchema

class SaleSchemas (BaseSchema):
    sale_id = fields.Int(dump_only=True)
    client_id = fields.Int()
    datte = fields.DateTime()
    status = fields.Boolean()
    user_creation_id = fields.Integer()
    user_modification_id = fields.Integer()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()
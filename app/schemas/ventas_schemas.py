from marshmallow import fields

from app.schemas.base_schema import BaseSchema

class SaleSchemas (BaseSchema):
    id = fields.Int(dump_only=True)
    id_client = fields.Str()
    date = fields.Date()
    status = fields.Boolean()
    user_creation_id = fields.Integer()
    user_modification_id = fields.Integer()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()
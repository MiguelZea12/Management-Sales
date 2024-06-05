from marshmallow import fields

from app.schemas.base_schema import BaseSchema  # Asegúrate de importar correctamente tu BaseSchema

class ClientSchema(BaseSchema):
    clien_id : fields.Int(dump_only=True)   # type: ignore
    names = fields.String()
    email = fields.String()
    telefono = fields.String()
    status = fields.Boolean()
    user_cration_id = fields.Integer()
    user_modification_id = fields.Integer()
    creation_date = fields.DateTime()
    modification_date = fields.DateTime()




    
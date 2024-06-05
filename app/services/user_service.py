from sqlalchemy import text
from app.engines import session_bpm
from app.extensions import db, bcrypt_instance
from app.models.cliente import Client
from app.utils.utilities import timeNowTZ
from app.schemas.client_schemas import ClientSchema

  
def get(id: int):
    client_object = db.session.query(Client).filter(Client.id == id, Client.status == True).first()
    client_schema = ClientSchema()
    return client_schema.dump(client_object)

def get_all():
    client_objects = db.session.query(Client).filter(Client.status == True).all()
    client_schema = ClientSchema(many=True)
    return client_schema.dump(client_objects)

def create(nombre: str, email: str, telefono: str, status: bool = True):
    client_object = Client(
        nombre=nombre,
        email=email,
        telefono=telefono,
        status=status
    )
    db.session.add(client_object)
    db.session.commit()
    client_schema = ClientSchema()
    return client_schema.dump(client_object)

def update(id: int, data: dict):
    client_object = db.session.query(Client).filter(Client.id == id).first()
    for key, value in data.items():
        setattr(client_object, key, value)
    db.session.commit()
    client_schema = ClientSchema()
    return client_schema.dump(client_object)

def delete(id: int):
    client_object = db.session.query(Client).filter(Client.id == id).first()
    client_object.status = False
    db.session.commit()



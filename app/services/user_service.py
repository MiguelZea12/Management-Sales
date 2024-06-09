from sqlalchemy import text
from app.extensions import db
from app.models.cliente import Client
from app.utils.utilities import timeNowTZ
from app.schemas.client_schemas import ClientSchema

def get(id: int):
    client_object = db.session.query(Client).filter(Client.id == id, Client.status == True).first()
    if client_object is None:
        return {"message": "Client not found"}, 404
    client_schema = ClientSchema()
    return client_schema.dump(client_object), 200

def get_all():
    client_objects = db.session.query(Client).filter(Client.status == True).all()
    client_schema = ClientSchema(many=True)
    clients = client_schema.dump(client_objects)
    print(clients)  # Agrega este log para verificar los datos
    return clients


def create(names: str, email: str, telefono: str, status: bool):
    client_object = Client(
        names=names,
        email=email,
        telefono=telefono,
        status=status,
        user_cration_id=1
    )
    db.session.add(client_object)
    db.session.commit()
    client_schema = ClientSchema()
    return client_schema.dump(client_object), 201

def update(id: int, data: dict):
    client_object = db.session.query(Client).filter(Client.id == id).first()
    if client_object is None:
        return {"message": "Client not found"}, 404
    for key, value in data.items():
        setattr(client_object, key, value)
    db.session.commit()
    client_schema = ClientSchema()
    return client_schema.dump(client_object), 200

def delete(id: int):
    client_object = db.session.query(Client).filter(Client.id == id).first()
    if client_object is None:
        return {"message": "Client not found"}, 404
    client_object.status = False
    db.session.commit()
    return {"message": "Client deleted successfully"}, 200
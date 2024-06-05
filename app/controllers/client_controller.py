from flask import Blueprint, request
from app.utils.response import create_response
from app.services.user_service import get, get_all, create, update, delete

client_blueprint = Blueprint("Clients", __name__, url_prefix="/clients")

@client_blueprint.route("/", methods=["GET"])
def get_clients():
    clients = get_all()
    return create_response("success", data={"clients": clients}, status_code=200)

@client_blueprint.route("/<int:id>", methods=["GET"])
def get_client(id):
    client = get(id)
    if client:
        return create_response("success", data={"client": client}, status_code=200)
    return create_response("error", message="Client not found", status_code=404)

@client_blueprint.route("/", methods=["POST"])
def create_client():
    data = request.get_json()
    new_client = create(**data)
    return create_response("success", data={"client": new_client}, status_code=201)

@client_blueprint.route("/<int:id>", methods=["PUT"])
def update_client(id):
    data = request.get_json()
    updated_client = update(id, data)
    if updated_client:
        return create_response("success", data={"client": updated_client}, status_code=200)
    return create_response("error", message="Client not found", status_code=404)

@client_blueprint.route("/<int:id>", methods=["DELETE"])
def delete_client(id):
    result = delete(id)
    if result:
        return create_response("success", message="Client deleted", status_code=204)
    return create_response("error", message="Client not found", status_code=404)





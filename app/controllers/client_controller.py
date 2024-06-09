from flask import Blueprint, jsonify, request
from app.services.user_service import get_all, get, create, update, delete

client_blueprint = Blueprint("Clients", __name__, url_prefix="/api/clients")

@client_blueprint.route("/", methods=["GET"])
def get_clients():
    clients = get_all()
    return jsonify(clients)

@client_blueprint.route("/<int:id>", methods=["GET"])
def get_client(id):
    client, status = get(id)
    return jsonify(client), status

@client_blueprint.route("/new", methods=["POST"])
def create_client():
    data = request.get_json()
    new_client, status = create(
        data['names'], 
        data['email'], 
        data['telefono'], 
        data['status'])
    return jsonify(new_client), status

@client_blueprint.route("/<int:id>/edit", methods=["PUT"])
def update_client(id):
    data = request.get_json()
    updated_client, status = update(id, data)
    return jsonify(updated_client), status

@client_blueprint.route("/<int:id>/delete", methods=["DELETE"])
def delete_client(id):
    print(f"Received DELETE request for client id: {id}")
    result, status = delete(id)
    return jsonify(result), status


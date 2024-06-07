from flask import Blueprint, request, render_template, redirect, url_for
from app.utils.response import create_response
from app.services.user_service import get, get_all, create, update, delete

client_blueprint = Blueprint("Clients", __name__, url_prefix="/clients")

@client_blueprint.route("/", methods=["GET"])
def get_clients():
    clients = get_all()
    return render_template("clients.html", clients=clients)

@client_blueprint.route("/<int:id>", methods=["GET"])
def get_client(id):
    client = get(id)
    if client:
        return render_template("client_detail.html", client=client)
    return create_response("error", message="Client not found", status_code=404)

@client_blueprint.route("/new", methods=["GET", "POST"])
def create_client():
    if request.method == "POST":
        data = request.form.to_dict()
        data["status"] = "status" in data
        new_client = create(**data)
        return redirect(url_for('Clients.get_clients'))
    return render_template("client_form.html", form_title="Crear", form_action=url_for('Clients.create_client'))

@client_blueprint.route("/<int:id>/edit", methods=["GET", "POST"])
def update_client(id):
    client = get(id)
    if request.method == "POST":
        data = request.form.to_dict()
        data["status"] = "status" in data
        updated_client = update(id, data)
        return redirect(url_for('Clients.get_clients'))
    return render_template("client_form.html", form_title="Editar", form_action=url_for('Clients.update_client', id=id), client=client)

@client_blueprint.route("/<int:id>/delete", methods=["POST"])
def delete_client(id):
    result = delete(id)
    return redirect(url_for('Clients.get_clients'))





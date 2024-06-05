from flask import Blueprint, request
from app.utils.response import create_response
from app.services.sales_description_service import get, get_all, create, update, delete

detail_blueprint = Blueprint("Detail", __name__, url_prefix="/details")

@detail_blueprint.route("/", methods=["GET"])
def get_details():
    details = get_all()
    return create_response("success", data={"details": details}, status_code=200)

@detail_blueprint.route("/<int:id>", methods=["GET"])
def get_detail(id):
    detail = get(id)
    if detail:
        return create_response("success", data={"detail": detail}, status_code=200)
    return create_response("error", message="Detail not found", status_code=404)

@detail_blueprint.route("/", methods=["POST"])
def create_detail():
    data = request.get_json()
    new_detail = create(**data)
    return create_response("success", data={"detail": new_detail}, status_code=201)

@detail_blueprint.route("/<int:id>", methods=["PUT"])
def update_detail(id):
    data = request.get_json()
    updated_detail = update(id, data)
    if updated_detail:
        return create_response("success", data={"detail": updated_detail}, status_code=200)
    return create_response("error", message="Detail not found", status_code=404)

@detail_blueprint.route("/<int:id>", methods=["DELETE"])
def delete_detail(id):
    result = delete(id)
    if result:
        return create_response("success", message="Detail deleted", status_code=204)
    return create_response("error", message="Detail not found", status_code=404)

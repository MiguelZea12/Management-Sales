from flask import Blueprint, request
from app.utils.response import create_response
from app.services.sales_service import get, get_all, create, update, delete

sales_blueprint = Blueprint("Sales", __name__, url_prefix="/sales")

@sales_blueprint.route("/", methods=["GET"])
def get_sales():
    sales = get_all()
    return create_response("success", data={"sales": sales}, status_code=200)

@sales_blueprint.route("/<int:id>", methods=["GET"])
def get_sale(id):
    sale = get(id)
    if sale:
        return create_response("success", data={"sale": sale}, status_code=200)
    return create_response("error", message="Sale not found", status_code=404)

@sales_blueprint.route("/", methods=["POST"])
def create_sale():
    data = request.get_json()
    new_sale = create(**data)
    return create_response("success", data={"sale": new_sale}, status_code=201)

@sales_blueprint.route("/<int:id>", methods=["PUT"])
def update_sale(id):
    data = request.get_json()
    updated_sale = update(id, data)
    if updated_sale:
        return create_response("success", data={"sale": updated_sale}, status_code=200)
    return create_response("error", message="Sale not found", status_code=404)

@sales_blueprint.route("/<int:id>", methods=["DELETE"])
def delete_sale(id):
    result = delete(id)
    if result:
        return create_response("success", message="Sale deleted", status_code=204)
    return create_response("error", message="Sale not found", status_code=404)

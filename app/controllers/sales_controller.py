from flask import Blueprint, jsonify, request
from app.services.sales_service import get, get_all, create, update, delete

sales_blueprint = Blueprint("Sales", __name__, url_prefix="/api/sales")

@sales_blueprint.route("/", methods=["GET"])
def get_sales():
    sales = get_all()
    return jsonify(sales)

@sales_blueprint.route("/<int:id>", methods=["GET"])
def get_sale(id):
    sale, status_code = get(id)
    return jsonify(sale), status_code

@sales_blueprint.route("/new", methods=["POST"])
def create_sale():
    data = request.json
    new_sale, status_code = create(**data)
    return jsonify(new_sale), status_code

@sales_blueprint.route("/<int:id>/edit", methods=["PUT"])
def update_sale(id):
    data = request.json
    updated_sale, status_code = update(id, data)
    return jsonify(updated_sale), status_code

@sales_blueprint.route("/<int:id>/delete", methods=["DELETE"])
def delete_sale(id):
    result, status_code = delete(id)
    return jsonify(result), status_code

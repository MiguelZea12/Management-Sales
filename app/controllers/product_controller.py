from flask import Blueprint, request
from app.utils.response import create_response
from app.services.product_service import get, get_all, create, update, delete

product_blueprint = Blueprint("Product", __name__, url_prefix="/products")

@product_blueprint.route("/", methods=["GET"])
def get_products():
    products = get_all()
    return create_response("success", data={"products": products}, status_code=200)

@product_blueprint.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = get(id)
    if product:
        return create_response("success", data={"product": product}, status_code=200)
    return create_response("error", message="Product not found", status_code=404)

@product_blueprint.route("/", methods=["POST"])
def create_product():
    data = request.get_json()
    new_product = create(**data)
    return create_response("success", data={"product": new_product}, status_code=201)

@product_blueprint.route("/<int:id>", methods=["PUT"])
def update_product(id):
    data = request.get_json()
    updated_product = update(id, data)
    if updated_product:
        return create_response("success", data={"product": updated_product}, status_code=200)
    return create_response("error", message="Product not found", status_code=404)

@product_blueprint.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    result = delete(id)
    if result:
        return create_response("success", message="Product deleted", status_code=204)
    return create_response("error", message="Product not found", status_code=404)

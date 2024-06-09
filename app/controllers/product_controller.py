from flask import Blueprint, request, jsonify
from app.services.product_service import get, get_all, create, update, delete

product_blueprint = Blueprint("Product", __name__, url_prefix="/api/products")

@product_blueprint.route("/", methods=["GET"])
def get_products():
    products = get_all()
    return jsonify(products)

@product_blueprint.route("/<int:id>", methods=["GET"])
def get_product(id):
    product, status_code = get(id)
    return jsonify(product), status_code

@product_blueprint.route("/new", methods=["POST"])
def create_product():
    data = request.json
    new_product = create(**data)
    return jsonify(new_product), 201

@product_blueprint.route("/<int:id>/edit", methods=["PUT"])
def update_product(id):
    data = request.json
    updated_product, status_code = update(id, data)
    return jsonify(updated_product), status_code

@product_blueprint.route("/<int:id>/delete", methods=["DELETE"])
def delete_product(id):
    delete(id)
    return jsonify({"message": "Product deleted successfully"}), 200

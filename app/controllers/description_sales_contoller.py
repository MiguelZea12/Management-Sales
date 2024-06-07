from flask import Blueprint, request, redirect, url_for
from app.services.sales_description_service import create_sale_detail, update_sale_detail, delete_sale_detail

sale_description_blueprint = Blueprint("SaleDescription", __name__, url_prefix="/sale-descriptions")

@sale_description_blueprint.route("/", methods=["POST"])
def create_sale_description():
    data = request.get_json()
    new_description = create_sale_detail(**data)
    return {"message": "Sale description created successfully", "sale_description": new_description}, 201

@sale_description_blueprint.route("/<int:description_id>", methods=["PUT"])
def update_sale_description(description_id):
    data = request.get_json()
    updated_description = update_sale_detail(description_id, data)
    return {"message": "Sale description updated successfully", "sale_description": updated_description}, 200

@sale_description_blueprint.route("/<int:description_id>", methods=["DELETE"])
def delete_sale_description(description_id):
    delete_sale_detail(description_id)
    return {"message": "Sale description deleted successfully"}, 204

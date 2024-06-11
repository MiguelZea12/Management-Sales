from flask import Blueprint, jsonify, request
from app.services.sales_service import get, get_all, create_sale, update, delete
from app.services.sales_description_service import get_sale_details, update as update_detail

sales_blueprint = Blueprint("Sales", __name__, url_prefix="/api/sales")

@sales_blueprint.route("/", methods=["GET"])
def get_sales():
    sales = get_all()
    return jsonify(sales)

@sales_blueprint.route("/<int:id>/details", methods=["GET"])
def get_sale_details_controller(id):
    details = get_sale_details(id)
    return jsonify(details), 200

@sales_blueprint.route("/<int:id>", methods=["GET"])
def get_sale(id):
    sale, status_code = get(id)
    return jsonify(sale), status_code

@sales_blueprint.route("/new", methods=["POST"])
def create_sale_controller():
    data = request.json
    sale_id = create_sale(
        id_client=data.get('id_client'),
        date=data.get('date'),
        status=data.get('status'),
        details=data.get('details')
    )
    return jsonify({"sale_id": sale_id}), 201

@sales_blueprint.route("/<int:id>/edit", methods=["PUT"])
def update_sale(id):
    data = request.json
    sale_data = data.get('sale', {})
    detail_data = data.get('detail', {})
    updated_sale, status_code = update(id, sale_data)
    if status_code != 200:
        return jsonify(updated_sale), status_code
    detail_data['id_sale'] = id  # Usar el ID de la venta existente para actualizar los detalles
    updated_detail, detail_status_code = update_detail(id, **detail_data)
    if detail_status_code != 200:
        return jsonify(updated_detail), detail_status_code
    return jsonify({'sale': updated_sale, 'detail': updated_detail}), 200

@sales_blueprint.route("/<int:id>/delete", methods=["DELETE"])
def delete_sale(id):
    result, status_code = delete(id)
    return jsonify(result), status_code

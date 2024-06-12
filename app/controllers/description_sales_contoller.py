from flask import Blueprint, request, jsonify
from app.services.sales_description_service import get_all, get, create, update_detail, delete

detail_blueprint = Blueprint("Detail", __name__, url_prefix="/api/details")

@detail_blueprint.route("/", methods=["GET"])
def get_details():
    details = get_all()
    return jsonify(details), 200

@detail_blueprint.route("/<int:id>", methods=["GET"])
def get_detail(id):
    detail = get(id)
    if detail:
        return jsonify(detail), 200
    return jsonify({'message': 'Detail not found'}), 404

@detail_blueprint.route("/", methods=["POST"])
def create_detail():
    data = request.get_json()
    new_detail, status_code = create(**data)
    return jsonify(new_detail), status_code

@detail_blueprint.route("/<int:id>", methods=["PUT"])
def update_detail(id):
    data = request.get_json()
    updated_detail, status_code = update_detail(id, **data)
    return jsonify(updated_detail), status_code

@detail_blueprint.route("/<int:id>", methods=["DELETE"])
def delete_detail(id):
    result, status_code = delete(id)
    return jsonify(result), status_code


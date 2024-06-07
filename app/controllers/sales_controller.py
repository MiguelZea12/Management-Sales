from flask import Blueprint, request, render_template, redirect, url_for
from app.utils.response import create_response
from app.services.sales_service import get, get_all, create, update, delete

sales_blueprint = Blueprint("Sales", __name__, url_prefix="/sales")

@sales_blueprint.route("/", methods=["GET"])
def get_sales():
    sales = get_all()
    return render_template("sales.html", sales=sales)

@sales_blueprint.route("/<int:id>", methods=["GET"])
def get_sale(id):
    sale = get(id)
    if sale:
        return render_template("sale_detail.html", sale=sale)
    return create_response("error", message="Sale not found", status_code=404)


@sales_blueprint.route("/new", methods=["GET", "POST"])
def create_sale():
    if request.method == "POST":
        data = request.form.to_dict()
        data["status"] = "status" in data
        new_sale = create(data)
        return redirect(url_for('Sales.get_sales'))
    return render_template("sale_form.html", form_title="Crear", form_action=url_for('Sales.create_sale'))

@sales_blueprint.route("/<int:id>/edit", methods=["GET", "POST"])
def update_sale(id):
    sale = get(id)
    if request.method == "POST":
        data = request.form.to_dict()
        data["status"] = "status" in data
        updated_sale = update(id, data)
        return redirect(url_for('Sales.get_sales'))
    return render_template("sale_form.html", form_title="Editar", form_action=url_for('Sales.update_sale', id=id), sale=sale)

@sales_blueprint.route("/<int:id>/delete", methods=["POST"])
def delete_sale(id):
    result = delete(id)
    return redirect(url_for('Sales.get_sales'))

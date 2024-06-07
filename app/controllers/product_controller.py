from flask import Blueprint, request, render_template, redirect, url_for
from app.utils.response import create_response
from app.services.product_service import get, get_all, create, update, delete

product_blueprint = Blueprint("Product", __name__, url_prefix="/products")

@product_blueprint.route("/", methods=["GET"])
def get_products():
    products = get_all()
    return render_template("products.html", products=products)

@product_blueprint.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = get(id)
    if product:
        return render_template("product_detail.html", product=product)
    return create_response("error", message="Product not found", status_code=404)

@product_blueprint.route("/new", methods=["GET", "POST"])
def create_product():
    if request.method == "POST":
        data = request.form.to_dict()
        data["status"] = "status" in data
        new_product = create(**data)
        return redirect(url_for('Product.get_products'))
    return render_template("product_form.html", form_title="Crear", form_action=url_for('Product.create_product'))

@product_blueprint.route("/<int:id>/edit", methods=["GET", "POST"])
def update_product(id):
    product = get(id)
    if request.method == "POST":
        data = request.form.to_dict()
        data["status"] = "status" in data
        updated_product = update(id, data)
        return redirect(url_for('Product.get_products'))
    return render_template("product_form.html", form_title="Editar", form_action=url_for('Product.update_product', id=id), product=product)

@product_blueprint.route("/<int:id>/delete", methods=["POST"])
def delete_product(id):
    result = delete(id)
    return redirect(url_for('Product.get_products'))
from flask import Flask, render_template, Blueprint

landing_page = Blueprint("landing", __name__)

@landing_page.route('/', methods=["GET"])
def index():
    return render_template('/landing/index.html')
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/application")
def rental_application():
    return render_template("rental-application.html")

@app.route("/pay")
def pay_rent():
    return render_template("pay.html")

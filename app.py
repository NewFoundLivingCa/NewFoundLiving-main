from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/rent')
# def rent():
#     return render_template('rent.html')

@app.route('/rental-application')
def rental_application():
    return render_template('rental-application.html')

if __name__ == '__main__':
    app.run(debug=True)


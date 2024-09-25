from flask import Flask, render_template, redirect, url_for, flash, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from forms import RegistrationForm, LoginForm, ProductForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['MONGO_URI'] = "mongodb://localhost:27017/farmers_marketplace"  # MongoDB URI

# Initialize PyMongo
mongo = PyMongo(app)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    if user_data:
        return User(user_data)
    return None

# User class for Flask-Login
class User(UserMixin):
    def __init__(self, user_data):
        self.id = str(user_data['_id'])
        self.username = user_data['username']
        self.password_hash = user_data['password']

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/')
def index():
    products = mongo.db.products.find()
    return render_template('index.html', products=products)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        mongo.db.users.insert_one({
            'username': form.username.data,
            'password': hashed_password
        })
        flash('Account created successfully! Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user_data = mongo.db.users.find_one({'username': form.username.data})
        if user_data and check_password_hash(user_data['password'], form.password.data):
            user = User(user_data)
            login_user(user)
            return redirect(url_for('index'))
        flash('Login Unsuccessful. Please check your username and password', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/add_product', methods=['GET', 'POST'])
@login_required
def add_product():
    form = ProductForm()
    if form.validate_on_submit():
        mongo.db.products.insert_one({
            'name': form.name.data,
            'description': form.description.data,
            'price': form.price.data,
            'user_id': current_user.id
        })
        flash('Product added successfully!', 'success')
        return redirect(url_for('index'))
    return render_template('add_product.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)

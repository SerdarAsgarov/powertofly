from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand


db = SQLAlchemy()
migrate = Migrate()
manager = Manager()
manager.add_command('db', MigrateCommand)


class User(db.Model):
    __tablename__ = "api_user"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False, index=True)
    last_name = db.Column(db.String(20), nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    age = db.Column(db.Integer(), nullable=False, index=True)
    is_employee = db.Column(db.Boolean(), nullable=False, index=True)

    def __init__(self, first_name, last_name, email, age, is_employee):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.age = age
        self.is_employee = is_employee

    def __repr__(self):
        return f"User(db.Model) -> " \
               f"id: {self.id}, First Name: {self.first_name}, Last Name: {self.last_name}, Email: {self.email}, Age: {self.age}"

import random
from flask_seeder import FlaskSeeder, Seeder, Faker, generator
from powertoflyapi.db.models import User


seeder = FlaskSeeder()


class UserSeeder(Seeder):
    def __init__(self):
        print("Initializing User Faker")
        self.emails = set()

    def run(self):
        # Create a new Faker and tell it how to create User objects
        faker = Faker(
            cls=User,
            init={
                "first_name": generator.Name(),
                "last_name": generator.Name(),
                "email": generator.String("[a-z]{6,11}[0-9]{2,5}@gmail.com"),
                "age": generator.Integer(start=20, end=100),
                "is_employee": bool(random.uniform(0, 1)),
            }
        )

        for user in faker.create(1_000_000):
            print(f"Adding user: {user}")
            self.db.session.add(user)

        self.db.session.commit()


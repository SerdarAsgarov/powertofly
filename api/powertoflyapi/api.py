from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from powertoflyapi.config import Config
from powertoflyapi.resolvers import UserResolver
from powertoflyapi.db.models import db, migrate, manager
from powertoflyapi.seeds.user import seeder


app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app, resources={r"/": {"origins": "*"}})  # TODO: remove localhost
api = Api(app)
db.init_app(app)
migrate.init_app(app, db)
seeder.init_app(app, db)

parser = reqparse.RequestParser()
parser.add_argument('firstName', type=str, help='First name of user')
parser.add_argument('lastName', type=str, help="Last name of user")
parser.add_argument('email', type=str, help="Email of user")
parser.add_argument('minAge', type=int, help="Age of user (from)")
parser.add_argument('maxAge', type=int, help="Age of user (to)")
parser.add_argument('isEmployee', type=bool, help="Is user employee")
parser.add_argument('page', type=int, help="Number of page is missing", required=True)


class Root(Resource):
    @staticmethod
    def get():
        """
        Basic API information
        :return:
        """
        return {"message": "This is a PowerToFlyTask API v1.0"}


class User(Resource):
    @cross_origin()
    def get(self):
        """
        GET /users
        :return list: jsonized paginated users
        """
        args = parser.parse_args()
        return UserResolver.paginated(filters=args, page=args['page'])


api.add_resource(Root, "/")
api.add_resource(User, "/users")

if __name__ == '__main__':
    manager.run()

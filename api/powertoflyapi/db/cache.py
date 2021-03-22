import redis
from flask import current_app as app
from redisearch import Client, TextField, NumericField, IndexDefinition, Query


class UserCache:
    def __init__(self):
        self.client = Client("api_user_index", app.config["REDIS_HOST"], app.config["REDIS_PORT"])

    def create_user_index(self, users):
        """
        Creates a new user index if not exists
        :param users:
        :return:
        """
        definition = IndexDefinition(prefix=['doc:', 'user:'])

        try:
            self.client.create_index((TextField("first_name"), TextField("last_name"), TextField("email"),
                                      NumericField("age"), NumericField("is_employee"),
                                      NumericField("user_id", sortable=True)), definition=definition)
        except redis.exceptions.ResponseError:
            return False

        indexer = self.client.batch_indexer(chunk_size=len(users))

        for user in users:
            fields = {
                "first_name": user.first_name.translate(str.maketrans({"-": r"\-"})),
                "last_name": user.last_name.translate(str.maketrans({"-": r"\-"})),
                "email": user.email.translate(str.maketrans({"-": r"\-"})),
                "age": user.age,
                "user_id": user.id,
                "is_employee": int(user.is_employee),
            }
            indexer.add_document(f"doc:{user.id}", **fields)
        indexer.commit()

        return True

    def cache_single_user(self, user):
        """
        Caches a single user
        :param user:
        :return:
        """
        self.client.redis.hset(f"doc:{user.id}", mapping={
            "first_name": user.first_name.translate(str.maketrans({"-": r"\-"})),
            "last_name": user.last_name.translate(str.maketrans({"-": r"\-"})),
            "email": user.email.translate(str.maketrans({"-": r"\-"})),
            "age": user.age,
            "user_id": user.id,
            "is_employee": int(user.is_employee),
        })

        return True

    def search(self, filters, page, per_page):
        """
        Searches through redis
        :return:
        """
        q = Query(self.build_query(filters)).paging((page - 1) * per_page, per_page).sort_by("user_id")

        return self.client.search(q)

    def build_query(self, filters):
        query = []
        age = "+@age:[minAge maxAge]"

        for filter_name, value in filters.items():
            # Ugly non-solid way
            if value is not None:
                if filter_name == "firstName":
                    query.append(f"+@first_name:{value}*")
                if filter_name == "lastName":
                    query.append(f"+@last_name:{value}*")
                if filter_name == "email":
                    query.append(f"+@email:{value}*")
                if filter_name == "minAge":
                    age = age.replace("minAge", str(value))
                if filter_name == "maxAge":
                    age = age.replace("maxAge", str(value))
                if filter_name == "isEmployee":
                    query.append(f"+@is_employee:{int(value)}")

        age = age.replace("minAge", "0")
        age = age.replace("maxAge", "100")

        query.append(age)

        return " ".join(query)

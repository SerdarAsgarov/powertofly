import math
import redis
from flask import jsonify
from powertoflyapi.db.models import User
from powertoflyapi.db.cache import UserCache


class UserResolver:
    @staticmethod
    def from_db(filters, page, per_page):
        """
        Returns paginated users with filters from DB
        :param filters:
        :param page:
        :param per_page:
        :return:
        """
        record_query = User.query

        for filter_name, value in filters.items():
            # Ugly non-solid way, but there is no other wtih SQLAlchemy
            if value is not None:
                if filter_name == "firstName":
                    record_query = record_query.filter(User.first_name.ilike(f"{value}%"))
                if filter_name == "lastName":
                    record_query = record_query.filter(User.last_name.ilike(f"{value}%"))
                if filter_name == "email":
                    record_query = record_query.filter(User.email.ilike(f"{value}%"))
                if filter_name == "minAge":
                    record_query = record_query.filter(User.age >= value)
                if filter_name == "maxAge":
                    record_query = record_query.filter(User.age <= value)
                if filter_name == "isEmployee":
                    record_query = record_query.filter(User.is_employee == value)

        result = record_query.order_by(User.id).paginate(page, per_page, False)
        users = []

        for record in result.items:
            users.append({
                "id": record.id,
                "firstName": record.first_name,
                "lastName": record.last_name,
                "age": record.age,
                "email": record.email,
                "isEmployee": record.is_employee,
            })

        return {"total": result.total, "users": users}

    @staticmethod
    def from_cache(filters, page, per_page):
        """
        Returns paginated users from cache
        :param filters:
        :param page:
        :param per_page:
        :return:
        """
        cache = UserCache()
        result = cache.search(filters, page, per_page)

        users = []
        for record in result.docs:
            users.append({
                "id": record.user_id,
                "firstName": record.first_name,
                "lastName": record.last_name,
                "age": record.age,
                "email": record.email,
                "isEmployee": record.is_employee,
            })

        return {"total": result.total, "users": users}

    @staticmethod
    def cache_users():
        cache = UserCache()
        cache.create_user_index(User.query.order_by(User.id).all())

    @staticmethod
    def paginated(filters, page=1, per_page=20):
        """
        Returns paginated users with filters
        :param filters:
        :param page:
        :param per_page:
        :return list:
        """

        try:
            result = UserResolver.from_cache(filters, page, per_page)
            print(result)
            source = "cache"
        except redis.exceptions.ResponseError as e:
            print(e)
            result = UserResolver.from_db(filters, page, per_page)
            source = "db"
            UserResolver.cache_users()

        return jsonify({
            "total": result["total"],
            "pages": math.ceil(result["total"] / per_page),
            "source": source,
            "users": result["users"],
        })

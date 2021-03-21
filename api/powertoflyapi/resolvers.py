from flask import jsonify
from powertoflyapi.db.models import User


class UserResolver:
    @staticmethod
    def paginated(filters, page=1, per_page=100):
        """
        Returns paginated users with filters
        :param filters:
        :param page:
        :param per_page:
        :return list:
        """
        record_query = User.query

        for filter_name, value in filters.items():
            if value is not None:
                if filter_name == "firstName":
                    record_query = record_query.filter(User.first_name.like(value))
                if filter_name == "lastName":
                    record_query = record_query.filter(User.last_name.like(value))
                if filter_name == "email":
                    record_query = record_query.filter(User.email.like(value))
                if filter_name == "minAge":
                    record_query = record_query.filter(User.age >= value)
                if filter_name == "maxAge":
                    record_query = record_query.filter(User.age <= value)
                if filter_name == "isEmployee":
                    record_query = record_query.filter(User.is_employee==value)

        result = record_query.paginate(page, per_page, False)
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

        return jsonify({
            "total": result.total,
            "users": users,
        })


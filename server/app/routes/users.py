from flask import Blueprint, request, jsonify
from app.models import db, User

users_bp = Blueprint('users', __name__, url_prefix='/users')

@users_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': u.id, 'username': u.username} for u in users])

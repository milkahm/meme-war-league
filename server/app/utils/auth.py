# app/utils/auth.py
from flask import session, jsonify
from functools import wraps

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized – Please log in'}), 401
        return f(*args, **kwargs)
    return wrapper

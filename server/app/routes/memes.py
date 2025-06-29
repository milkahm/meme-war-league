from flask import Blueprint, request, jsonify, session
from app.models import db, Meme
from sqlalchemy.exc import IntegrityError

memes_bp = Blueprint('memes', __name__, url_prefix='/memes')

# GET /memes
@memes_bp.route('/', methods=['GET'])
def get_memes():
    memes = Meme.query.all()
    return jsonify([{
        'id': m.id,
        'title': m.title,
        'image_url': m.image_url,
        'user_id': m.user_id
    } for m in memes])

# POST /memes (allowing unauthenticated users)
@memes_bp.route('/', methods=['POST'])
def create_meme():
    data = request.get_json()
    title = data.get('title')
    image_url = data.get('image_url')

    if not title or not image_url:
        return jsonify({'error': 'Title and image_url are required'}), 400

    meme = Meme(
        title=title,
        image_url=image_url,
        user_id=session.get('user_id')  # Optional: set user_id if available
    )

    try:
        db.session.add(meme)
        db.session.commit()
        return jsonify({'message': 'Meme created', 'id': meme.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Meme could not be created due to integrity error'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# PATCH /memes/<id>
@memes_bp.route('/<int:id>', methods=['PATCH'])
def update_meme(id):
    meme = Meme.query.get(id)
    if not meme:
        return jsonify({'error': 'Meme not found'}), 404

    data = request.get_json()
    title = data.get('title')
    image_url = data.get('image_url')

    if title:
        meme.title = title
    if image_url:
        meme.image_url = image_url

    try:
        db.session.commit()
        return jsonify({
            'id': meme.id,
            'title': meme.title,
            'image_url': meme.image_url,
            'user_id': meme.user_id
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# DELETE /memes/<id>
@memes_bp.route('/<int:id>', methods=['DELETE'])
def delete_meme(id):
    meme = Meme.query.get(id)
    if not meme:
        return jsonify({'error': 'Meme not found'}), 404

    try:
        db.session.delete(meme)
        db.session.commit()
        return jsonify({'message': 'Meme deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

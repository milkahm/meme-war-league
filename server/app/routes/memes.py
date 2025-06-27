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

# POST /memes (only for logged-in users)
@memes_bp.route('/', methods=['POST'])
def create_meme():
    if not session.get('user_id'):
        return jsonify({'error': 'Unauthorized – please log in to post memes'}), 401

    data = request.get_json()
    title = data.get('title')
    image_url = data.get('image_url')

    # Validate incoming data
    if not title or not image_url:
        return jsonify({'error': 'Title and image_url are required'}), 400

    # Create a new Meme instance
    meme = Meme(
        title=title,
        image_url=image_url,
        user_id=session['user_id']
    )

    try:
        db.session.add(meme)
        db.session.commit()
        return jsonify({'message': 'Meme created', 'id': meme.id}), 201
    except IntegrityError:
        db.session.rollback()  # Rollback the session in case of integrity error
        return jsonify({'error': 'Meme could not be created due to integrity error'}), 400
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of any other error
        return jsonify({'error': str(e)}), 500

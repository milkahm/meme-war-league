from flask import Blueprint, request, jsonify
from app.models import db, Vote, Meme
from sqlalchemy.exc import IntegrityError

votes_bp = Blueprint('votes', __name__, url_prefix='/votes')

@votes_bp.route('/', methods=['POST'])
def vote():
    data = request.get_json()

    # Validate incoming data
    if not data or 'battle_id' not in data or 'chosen_meme_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Optional: prevent duplicate votes for same meme in the same battle
        existing_vote = Vote.query.filter_by(
            battle_id=data['battle_id'],
            chosen_meme_id=data['chosen_meme_id']
        ).first()

        if existing_vote:
            return jsonify({'error': 'A vote for this meme in this battle already exists'}), 400

        # Create vote (no user_id required for anonymous voting)
        vote = Vote(
            battle_id=data['battle_id'],
            chosen_meme_id=data['chosen_meme_id']
        )

        db.session.add(vote)
        db.session.commit()

        # Update vote count for the meme
        chosen_meme = Meme.query.get(data['chosen_meme_id'])
        if chosen_meme:
            chosen_meme.vote_count += 1
            db.session.commit()

        return jsonify({
            'message': 'Vote recorded',
            'vote': {
                'battle_id': vote.battle_id,
                'chosen_meme_id': vote.chosen_meme_id,
                'new_vote_count': chosen_meme.vote_count
            }
        }), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Integrity error while saving vote'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

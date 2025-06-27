from flask import Blueprint, request, jsonify
from app.models import db, Vote, Meme  # Ensure Meme model is imported
from sqlalchemy.exc import IntegrityError

votes_bp = Blueprint('votes', __name__, url_prefix='/votes')

@votes_bp.route('/', methods=['POST'])
def vote():
    data = request.get_json()

    # Validate incoming data
    if not data or 'user_id' not in data or 'battle_id' not in data or 'chosen_meme_id' not in data:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Check if the user has already voted in this battle
        existing_vote = Vote.query.filter_by(
            user_id=data['user_id'],
            battle_id=data['battle_id']
        ).first()

        if existing_vote:
            return jsonify({'error': 'User  has already voted in this battle'}), 400

        # Create a new Vote instance
        vote = Vote(
            user_id=data['user_id'],
            battle_id=data['battle_id'],
            chosen_meme_id=data['chosen_meme_id']
        )
        
        # Add the vote to the session and commit
        db.session.add(vote)
        db.session.commit()

        # Update the vote count for the chosen meme
        chosen_meme = Meme.query.get(data['chosen_meme_id'])
        if chosen_meme:
            chosen_meme.vote_count += 1  # Assuming you have a vote_count field in your Meme model
            db.session.commit()

        return jsonify({'message': 'Vote recorded', 'vote': {
            'user_id': vote.user_id,
            'battle_id': vote.battle_id,
            'chosen_meme_id': vote.chosen_meme_id,
            'new_vote_count': chosen_meme.vote_count  # Return the updated vote count
        }}), 201

    except IntegrityError:
        db.session.rollback()  # Rollback the session in case of integrity error
        return jsonify({'error': 'Vote could not be recorded due to integrity error'}), 400
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        return jsonify({'error': str(e)}), 500

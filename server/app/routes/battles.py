from flask import Blueprint, request, jsonify, session
from app.models import db, Battle, BattleEntry
from datetime import datetime

battles_bp = Blueprint('battles', __name__)

@battles_bp.route('/', methods=['GET'])
def get_battles():
    battles = Battle.query.all()
    return jsonify([{
        'id': b.id,
        'title': b.title,
        'entries': [{'meme_id': e.meme_id, 'position': e.position} for e in b.entries]
    } for b in battles])

@battles_bp.route('/', methods=['POST'])
def create_battle():
    if not session.get('user_id'):
        return jsonify({'error': 'Unauthorized – please log in first'}), 401

    data = request.get_json()
    title = data.get('title')
    entries = data.get('entries', [])

    if not title or not entries:
        return jsonify({'error': 'Title and entries are required'}), 400

    try:
        battle = Battle(
            title=title,
            start_time=datetime.utcnow(),
            end_time=None
        )
        db.session.add(battle)
        db.session.commit()

        for entry in entries:
            battle_entry = BattleEntry(
                meme_id=entry['meme_id'],
                battle_id=battle.id,
                position=entry['position']
            )
            db.session.add(battle_entry)

        db.session.commit()
        return jsonify({'message': 'Battle created', 'id': battle.id}), 201  # Return the created battle ID

    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        return jsonify({'error': str(e)}), 500  # Return a 500 error with the exception message

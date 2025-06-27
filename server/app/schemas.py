from app.models import User, Meme, Battle, Vote, BattleEntry

def user_to_dict(user):
    return {
        'id': user.id,
        'username': user.username,
        'email': user.email
    }

def meme_to_dict(meme):
    return {
        'id': meme.id,
        'title': meme.title,
        'image_url': meme.image_url,
        'user_id': meme.user_id,
        'created_at': meme.created_at.isoformat()
    }

def battle_to_dict(battle):
    return {
        'id': battle.id,
        'title': battle.title,
        'start_time': battle.start_time.isoformat() if battle.start_time else None,
        'end_time': battle.end_time.isoformat() if battle.end_time else None,
        'entries': [battle_entry_to_dict(e) for e in battle.entries]
    }

def battle_entry_to_dict(entry):
    return {
        'id': entry.id,
        'meme_id': entry.meme_id,
        'battle_id': entry.battle_id,
        'position': entry.position
    }

def vote_to_dict(vote):
    return {
        'id': vote.id,
        'user_id': vote.user_id,
        'battle_id': vote.battle_id,
        'chosen_meme_id': vote.chosen_meme_id
    }

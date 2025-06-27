from app import create_app
from app.models import db, User, Meme, Battle, BattleEntry, Vote
from datetime import datetime

app = create_app()

with app.app_context():
    print("Clearing database...")
    Vote.query.delete()
    BattleEntry.query.delete()
    Battle.query.delete()
    Meme.query.delete()
    User.query.delete()

    print("Seeding users...")
    user1 = User(username="alice", email="alice@example.com", password_hash="hashedpw1")
    user2 = User(username="bob", email="bob@example.com", password_hash="hashedpw2")

    db.session.add_all([user1, user2])
    db.session.commit()

    print("Seeding memes...")
    meme1 = Meme(title="Funny Cat", image_url="https://example.com/cat.jpg", user_id=user1.id)
    meme2 = Meme(title="Doge", image_url="https://example.com/doge.jpg", user_id=user2.id)
    meme3 = Meme(title="Grumpy Cat", image_url="https://example.com/grumpy.jpg", user_id=user1.id)

    db.session.add_all([meme1, meme2, meme3])
    db.session.commit()

    print("Seeding battle...")
    battle = Battle(title="Cat vs Doge", start_time=datetime.utcnow())
    db.session.add(battle)
    db.session.commit()

    entry1 = BattleEntry(meme_id=meme1.id, battle_id=battle.id, position=1)
    entry2 = BattleEntry(meme_id=meme2.id, battle_id=battle.id, position=2)

    db.session.add_all([entry1, entry2])
    db.session.commit()

    print("Seeding votes...")
    vote = Vote(user_id=user2.id, battle_id=battle.id, chosen_meme_id=meme1.id)
    db.session.add(vote)
    db.session.commit()

    print("Done seeding!")

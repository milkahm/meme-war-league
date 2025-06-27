from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    memes = db.relationship('Meme', backref='user', cascade='all, delete')
    votes = db.relationship('Vote', backref='user', cascade='all, delete')

    def __repr__(self):
        return f'<User  {self.username}>'


class Meme(db.Model):
    __tablename__ = 'memes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    vote_count = db.Column(db.Integer, default=0)  # Add vote count

    battle_entries = db.relationship('BattleEntry', backref='meme', cascade='all, delete')

    def __repr__(self):
        return f'<Meme {self.title} (Votes: {self.vote_count})>'


class Battle(db.Model):
    __tablename__ = 'battles'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    entries = db.relationship('BattleEntry', backref='battle', cascade='all, delete')
    votes = db.relationship('Vote', backref='battle', cascade='all, delete')

    def __repr__(self):
        return f'<Battle {self.title}>'


class BattleEntry(db.Model):
    __tablename__ = 'battle_entries'

    id = db.Column(db.Integer, primary_key=True)
    meme_id = db.Column(db.Integer, db.ForeignKey('memes.id'), nullable=False)
    battle_id = db.Column(db.Integer, db.ForeignKey('battles.id'), nullable=False)
    position = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<BattleEntry {self.id} (Meme ID: {self.meme_id})>'


class Vote(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    battle_id = db.Column(db.Integer, db.ForeignKey('battles.id'), nullable=False)
    chosen_meme_id = db.Column(db.Integer, db.ForeignKey('memes.id'), nullable=False)

    def __repr__(self):
        return f'<Vote User ID: {self.user_id}, Battle ID: {self.battle_id}, Meme ID: {self.chosen_meme_id}>'

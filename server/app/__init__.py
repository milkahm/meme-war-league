from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from .models import db

migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "your-secret-key"  # Replace with a secure key

    # Session cookie settings (adjust as per deployment)
    app.config["SESSION_COOKIE_SAMESITE"] = "None"  # To allow cross-site cookies
    app.config["SESSION_COOKIE_SECURE"] = False     # Set True in production (requires HTTPS)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Enable CORS globally with credentials support and specific origins allowed
    CORS(app,
         supports_credentials=True,
         resources={r"/*": {"origins": ["http://localhost:5173"]}})  # React app origin

    # Import blueprints
    from .routes.memes import memes_bp
    from .routes.battles import battles_bp
    from .routes.votes import votes_bp
    from .routes.users import users_bp
    from .routes.auth import auth_bp

    # Register blueprints
    app.register_blueprint(memes_bp, url_prefix='/memes')
    app.register_blueprint(battles_bp, url_prefix='/battles')
    app.register_blueprint(votes_bp, url_prefix='/votes')
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app

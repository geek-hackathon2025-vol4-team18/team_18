from flask import Flask
from config import Config
from app.routes import register_routes
from app.extensions import db

def create_app():
    app = Flask(
        __name__,
        template_folder='app/templates',
        static_folder='app/static'
    )
    app.config.from_object(Config)
    db.init_app(app)
    register_routes(app)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0',port=8080, debug=True)

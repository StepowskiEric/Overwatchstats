from app import app, db

if __name__ == "main":
    db.create_all()
    app.run()
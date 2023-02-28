from app.models import db, Goal, Badge, environment, SCHEMA
from random import randint
from datetime import datetime


def seed_badges():
    goals = Goal.query.all()
    for g in goals:
        badge = Badge(
            goal_id = g.id,
            name = g.name,
            description = g.description,
            url = "https://www.seekpng.com/png/detail/195-1951005_zootopia-party-badge-emoticon-police-badge-emoji.png"
        )
        db.session.add(badge)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_badges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.badges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM badges")

    db.session.commit()

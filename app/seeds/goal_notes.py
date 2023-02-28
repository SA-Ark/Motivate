from app.models import db, Goal, GoalNote, environment, SCHEMA



def seed_goal_notes():
    goals = Goal.query.all()
    for g in goals:
        goal_note = GoalNote(
            goal_id = g.id,
            note_body = "Add notes for this goal here"
        )

        db.session.add(goal_note)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_goal_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.goal_notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM goal_notes")

    db.session.commit()

from app.models import db, Task, TaskNote, environment, SCHEMA



def seed_task_notes():
    tasks = Task.query.all()
    for t in tasks:
        task_note = TaskNote(
            task_id = t.id,
            note_body = "Add notes for this task here"
        )

        db.session.add(task_note)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_task_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.task_notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM task_notes")

    db.session.commit()

from app.models import db, Task, TaskNote, environment, SCHEMA

style = '{"blocks":[{"key":"cr1ke","text":"                                                                                     General:                                                                                  ","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":175,"style":"BOLD"},{"offset":85,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"88mi","text":"                                                                            ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":76,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8vuee","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7u67h","text":"                                                                            Resources & Links:","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":94,"style":"BOLD"},{"offset":76,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"c0fbs","text":"                                                                                     ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":85,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9olma","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eursi","text":"                                                                                    Journal:","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":92,"style":"BOLD"},{"offset":84,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"46i5a","text":"","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
text= 'General: Resources & Links: Journal:'

def seed_task_notes():
    tasks = Task.query.all()
    for t in tasks:
        task_note = TaskNote(
            task_id = t.id,
            note_body = f'{text}',
            note_style = f'{style}'
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

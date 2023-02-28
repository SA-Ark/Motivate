from app.models import db, Goal, Task, environment, SCHEMA
from random import randint
from datetime import datetime


def seed_tasks():
    goals = Goal.query.all()

    for g in goals:
        for i in range(randint(0,3)):
            task = Task(
            user_id = g.user_id,
            goal_id= g.id,
            name = f"task #{i}",
            description= f"Complete this task to get closer to achieving {g.name}",
            edit_access=True,
            difficulty='Easy' if g.id%3 == 0 else ('Medium' if g.id%3 == 1 else 'Hard'),
            priority='Urgent' if g.id%3 == 0 else ('Priority' if g.id%3 == 1 else 'Non-Priority'),
            completion_percent=0,
            tags='example',
            due_date= datetime(datetime.now().year, randint(5,12), randint(5,12))
            )
            db.session.add(task)
            for i in range(randint(1,6)):
                sub_task = Task(
                user_id = g.user_id,
                goal_id= g.id,
                parent_task_id = task.id,
                name = f"subtask #{i}",
                description= f"Complete this task to get closer to achieving {task.name}",
                edit_access=True,
                difficulty='Easy' if g.id%3 == 0 else ('Medium' if g.id%3 == 1 else 'Hard'),
                priority='Urgent' if g.id%3 == 0 else ('Priority' if g.id%3 == 1 else 'Non-Priority'),
                completion_percent=0,
                tags='example',
                due_date= datetime(datetime.now().year, randint(5,12), randint(5,12))
                )
                db.session.add(sub_task)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()

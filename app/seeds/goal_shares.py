# from app.models import db, Goal, GoalShare, User, environment, SCHEMA
# from random import randint


# def seed_goal_shares():
#     goals = Goal.query.all()
#     users = User.query.all()
#     for i in range(0,len(goals),9):
#         user_id = users[randint(0,len(users)-1)].id
#         edit_access = 1
#         while user_id == goals[i].user_id:
#             user_id = users[randint(0,len(users)-1)].id
#         if i%12 == 0:
#             edit_access = 2
#         goal_share = GoalShare(
#             goal_id = goals[i].id,
#             user_id = user_id,
#             edit_access = edit_access
#         )


#         db.session.add(goal_share)
#     db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
# def undo_goal_shares():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.goal_shares RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM goal_shares")

#     db.session.commit()

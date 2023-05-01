from app.models import db, Goal, User, environment, SCHEMA
from random import randint
from datetime import datetime

goals = [
    ("Learn a new language", "Expand your cultural horizons by learning a new language."),
    ("Read a book per week", "Boost your knowledge and vocabulary by reading a book every week."),
    ("Exercise 30 minutes daily", "Improve your physical health and mental wellbeing by exercising daily."),
    ("Save more each month", "Build financial security by saving more money each month."),
    ("Practice gratitude daily", "Improve your mood and outlook by practicing gratitude every day."),
    ("Learn a new skill", "Broaden your skill set by learning a new skill or trade."),
    ("Spend more time with family", "Strengthen your relationships with loved ones by spending more quality time together."),
    ("Travel to a new place", "Broaden your horizons and gain new experiences by traveling to a new place."),
    ("Cook a new recipe weekly", "Expand your culinary skills by cooking a new recipe every week."),
    ("Practice mindfulness daily", "Reduce stress and improve focus by practicing mindfulness and meditation."),
    ("Improve your public speaking", "Advance your career and boost your confidence by improving your public speaking skills."),
    ("Get more organized", "Increase productivity and reduce stress by getting more organized."),
    ("Volunteer in your community", "Give back to your community and help those in need by volunteering your time."),
    ("Learn to code", "Boost your career opportunities and problem-solving skills by learning to code."),
    ("Take a course", "Broaden your knowledge and skill set by taking a course in a new subject."),
    ("Start a new hobby", "Explore your interests and hobbies by starting a new activity or hobby."),
    ("Get better at networking", "Expand your professional network and career opportunities by improving your networking skills."),
    ("Spend less time on technology", "Improve your focus and relationships by reducing your screen time and technology use."),
    ("Learn a new instrument", "Broaden your creative horizons and gain new skills by learning to play a new instrument."),
    ("Spend more time outdoors", "Improve your mental and physical health by spending more time in nature and outdoors.")
]


def seed_goals():
    users = User.query.all()
    for u in users:
        recur_goals= [ Goal(
            user_id = u.id,
            name= "dailyGoal",
            description= f"This is {u.username}'s daily goal.",
            difficulty='Easy',
            importance='High',
            tags='Daily_Goal',
            recurring_goal=True,
        ),
        Goal(
            user_id = u.id,
            name= "weeklyGoal",
            description= f"This is {u.username}'s weekly goal.",
            difficulty='Easy',
            importance='High',
            tags='Weekly_Goal',
            recurring_goal=True,
        ),
        Goal(
            user_id = u.id,
            name= "monthlyGoal",
            description= f"This is {u.username}'s monthly goal.",
            difficulty='Easy',
            importance='High',
            tags='Monthly_Goal',
            recurring_goal=True,
        ),
        Goal(
            user_id = u.id,
            name= "yearlyGoal",
            description= f"This is {u.username}'s yearly goal.",
            difficulty='Easy',
            importance='High',
            tags='Yearly_Goal',
            recurring_goal=True,
        )
       ]
        for goal in recur_goals:
            db.session.add(goal)
        names = set()
        for i in range(6):
            completed = False
            name, description = goals[randint(0, len(goals)-1)]
            while name in names:
                name, description = goals[randint(0, len(goals)-1)]
            names.add(name)
            if i % 5 == 0:
                finished_on = datetime(datetime.now().year, datetime.now().month, 24)
            goal = Goal(
                user_id = u.id,
                name= name,
            description= description,
            edit_access=2,
            difficulty='Easy' if u.id%3 == 0 else ('Medium' if u.id%3 == 1 else 'Hard'),
            importance='Trivial' if u.id%3 == 0 else ('Important' if u.id%3 == 1 else 'Crucial'),
            completion_percent=0,
            tags='example',
            finished_on = finished_on if finished_on else None,
            due_date= datetime(datetime.now().year +randint(1,5), 1, 1)
            )
            finished_on = None

            db.session.add(goal)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_goals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.goals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM goals")

    db.session.commit()

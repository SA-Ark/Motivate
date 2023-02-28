from app.models import db, User, environment, SCHEMA
from random import randint

first_names = ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn",
               "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila", "Aria", "Scarlett",
               "Victoria", "Madison", "Luna", "Grace", "Chloe", "Penelope", "Layla", "Riley", "Zoey", "Nora",
               "Lily", "Eleanor", "Hannah", "Lillian", "Addison", "Aubrey", "Ellie", "Stella", "Natalie", "Leah",
               "Hazel", "Violet", "Aurora", "Savannah", "Audrey", "Brooklyn", "Bella", "Claire", "Skylar", "Lucy",
               "Paisley", "Everly", "Anna", "Caroline", "Nova", "Genesis", "Emilia", "Kennedy", "Samantha", "Maya",
               "Aaliyah", "Elena", "Sarah", "Ariana", "Allison", "Gabriella", "Alice", "Madelyn", "Cora", "Ruby",
               "Eva", "Serenity", "Autumn", "Adeline", "Hailey", "Gianna", "Valentina", "Isla", "Eliana", "Quinn",
               "Nevaeh", "Ivy", "Sadie", "Piper", "Lydia", "Alexa", "Josephine", "Emery", "Julia", "Delilah",'Jacob',
               'Ethan', 'Michael', 'William', 'James', 'Alexander', 'Benjamin', 'Mason', 'Elijah', 'Daniel', 'Matthew',
                 'Aiden', 'Henry', 'Joseph', 'Jackson', 'Samuel', 'Sebastian', 'David', 'Caleb', 'Wyatt', 'Owen',
                 'Andrew', 'Nicholas', 'Nathan', 'Ryan', 'Adam', 'Isaac', 'John', 'Luke', 'Jonathan', 'Gavin',
                 'Connor', 'Evan', 'Joshua', 'Landon', 'Christopher', 'Oliver', 'Tyler', 'Dylan', 'Brandon',
                 'Justin', 'Anthony', 'Robert', 'Aaron', 'Eric', 'Thomas', 'Charles', 'Peter', 'Timothy',
                 'Maxwell', 'Marcus']

last_names = [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown',
    'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
    'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker',
    'Hall', 'Allen', 'Young', 'King', 'Wright',
    'Scott', 'Green', 'Baker', 'Adams', 'Nelson',
    'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner',
    'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards',
    'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers',
    'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy',
    'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox',
    'Howard', 'Ward', 'Torres', 'Peterson', 'Gray',
    'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly',
    'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes',
    'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry',
    'Powell', 'Sullivan', 'Long', 'Patterson', 'Hughes',
    'Flores', 'Washington', 'Butler', 'Simmons', 'Foster',
    'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin',
    'Diaz', 'Hayes'
]


def seed_users():
    for i in range(10):
        first_name = first_names[randint(0, len(first_names)-1)]
        last_name = last_names[randint(0, len(last_names)-1)]
        user = User(
            username=f'{first_name} {last_name}',
            email=f'user{i}@aa.io',
            password='123',
            first_name = first_name,
            last_name = last_name)

        db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

from app.models import db, User, PaymentInfo, environment, SCHEMA
from random import randint
from datetime import datetime


def seed_payment_infos():
    users = User.query.all()
    for u in users:
        payment_info = PaymentInfo(
            user_id = u.id,
            billing_address = f"generic address {u.id}",
            city = "LA",
            state = "CA",
            zip = "90036",
            country = "USA",
            card_number = "0000 1111 2222 3333",
            expiry = datetime(datetime.now().year +randint(1,5), 1, 1),
            cvc = "123"
        )

        db.session.add(payment_info)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_payment_infos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payment_infos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM payment_infos")

    db.session.commit()

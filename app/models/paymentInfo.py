from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PaymentInfo(db.Model):
    __tablename__ = 'paymentinfos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)

def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'address': self.address,
        'city': self.city,
        'state': self.state,
        'zip': self.zip,
        'country': self.country
    }

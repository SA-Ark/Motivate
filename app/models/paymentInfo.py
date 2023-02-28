from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PaymentInfo(db.Model):
    __tablename__ = 'payment_infos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    billing_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    card_number = db.Column(db.String, nullable=False)
    expiry = db.Column(db.Date, nullable=False)
    cvc = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'billing_address': self.billing_address,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'country': self.country,
            'card_number': self.card_number,
            'expiry': self.expiry,
            "cvc": self.cvc,
        }

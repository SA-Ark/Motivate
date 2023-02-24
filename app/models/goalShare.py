from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class GoalShare(db.Model):
    __tablename__ = 'goal_shares'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    goal_id = db.Column(db.Integer, db.ForeignKey(
        'goals.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)
    edit_access = db.Column(db.Integer, default=2, nullable=False)
    shared_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            'goal_id': self.goal_id,
            'user_id': self.user_id,
            'edit_access': self.edit_access,
            'shared_on': self.shared_on
        }

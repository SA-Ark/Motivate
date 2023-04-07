from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Badge(db.Model):
    __tablename__ = 'badges'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    goal_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('goals.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name=db.Column(db.String(255), nullable=False)
    description=db.Column(db.Text, nullable=False)
    level=db.Column(db.Integer, nullable=False, default=0)
    # url=db.Column(db.String(255), nullable=False)
    created_at=db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at=db.Column(db.DateTime, onupdate=datetime.utcnow, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'goal_id': self.goal_id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'level': self.level,
            # 'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at if self.updated_at else None
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Goal(db.Model):
    __tablename__ = 'goals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    parent_goal_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('goals.id')), nullable=True)
    child_goal_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('goals.id')), nullable=True)
    name=db.Column(db.String(255), nullable=False)
    description=db.Column(db.Text, nullable=False)
    edit_access=db.Column(db.Integer, default=2, nullable=False)
    difficulty=db.Column(db.String(50), nullable=True)
    importance=db.Column(db.String(50), nullable=True)
    completion_percent=db.Column(db.Integer, default=0, nullable=False)
    tags=db.Column(db.String(255), nullable=True)
    due_date=db.Column(db.DateTime, nullable=True)
    created_at=db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at=db.Column(db.DateTime, onupdate=datetime.utcnow, nullable=True)
    finished_on=db.Column(db.DateTime, nullable=True)
    badges=db.relationship('Badge', backref='goal', lazy=True)
    users=db.relationship('User', secondary='goal_shares',
                          backref='shared_goals', lazy=True)
    note=db.relationship('GoalNote', backref='goal', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'parent_goal_id': self.parent_goal_id,
            'child_goal_id': self.child_goal_id,
            'name': self.name,
            'description': self.description,
            'edit_access': self.edit_access,
            'difficulty': self.difficulty,
            'importance': self.importance,
            'completion_percent': self.completion_percent,
            'tags': self.tags,
            'due_date': self.due_date if self.due_date else None,
            'created_at': self.created_at,
            'updated_at': self.updated_at if self.updated_at else None,
            'finished_on': self.finished_on if self.finished_on else None,
        }

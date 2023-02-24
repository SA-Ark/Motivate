from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    goal_id = db.Column(db.Integer, db.ForeignKey('goals.id'), nullable=False)
    parent_task_id = db.Column(
        db.Integer, db.ForeignKey('tasks.id'), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    edit_access = db.Column(db.Integer, default=2, nullable=False)
    difficulty = db.Column(db.String(255), nullable=True)
    priority = db.Column(db.String(255), nullable=True)
    completion_percent = db.Column(db.Integer, nullable=False)
    tags = db.Column(db.String(255), nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, onupdate=datetime.utcnow, nullable=True)
    finished_on = db.Column(db.DateTime, nullable=True)


def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'note_id': self.note_id,
        'goal_id': self.goal_id,
        'parent_task_id': self.parent_task_id,
        'name': self.name,
        'description': self.description,
        'edit_access': self.edit_access,
        'difficulty': self.difficulty,
        'priority': self.priority,
        'completion_percent': self.completion_percent,
        'tags': self.tags,
        'due_date': self.due_date if self.due_date else None,
        'created_at': self.created_at,
        'updated_at': self.updated_at if self.updated_at else None,
        'finished_on': self.finished_on if self.finished_on else None
    }

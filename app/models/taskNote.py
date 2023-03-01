from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class TaskNote(db.Model):
    __tablename__ = 'task_notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')), nullable=False)
    note_body=db.Column(db.String(255), nullable=True)
    created_at=db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at=db.Column(db.DateTime, onupdate=datetime.utcnow, nullable=True)

def to_dict(self):
    return {
        'id': self.id,
        'task_id': self.task_id,
        'note_body': self.note_body,
        'created_at': self.created_at,
        'updated_at': self.updated_at if self.updated_at else None
    }

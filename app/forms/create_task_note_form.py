from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length, Optional

class CreateTaskNoteForm(FlaskForm):
    task_id = IntegerField("Task Id")
    note_body = TextAreaField('Description')
    note_style = TextAreaField('Style')

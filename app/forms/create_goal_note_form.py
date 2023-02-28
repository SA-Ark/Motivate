from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length, Optional

class CreateGoalNoteForm(FlaskForm):
    goal_id = StringField("GoalId", validators=[DataRequired()])
    note_body = TextAreaField('Description', validators=[DataRequired()])

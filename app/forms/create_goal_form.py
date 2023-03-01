from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length, Optional

class CreateGoalForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=255)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=2, max=2000)])
    difficulty = StringField('Difficulty', validators=[DataRequired(), Length(max=50)])
    importance = StringField('Importance', validators=[DataRequired(), Length(max=50)])
    tags = StringField('Tags', validators=[Optional(), Length(max=255)])
    due_date = DateTimeField('Due Date',format='%Y-%m-%dT%H:%M', validators=[Optional()])

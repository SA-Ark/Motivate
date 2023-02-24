from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length, Optional

class CreateGoalForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired()])
    difficulty = StringField('Difficulty', validators=[Optional(), Length(max=50)])
    importance = StringField('Importance', validators=[Optional(), Length(max=50)])
    tags = StringField('Tags', validators=[Optional(), Length(max=255)])
    due_date = DateTimeField('Due Date', validators=[Optional()])
    finished_on = DateTimeField('Finished On', validators=[Optional()])

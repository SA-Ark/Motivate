from flask import Blueprint, jsonify, session, request
from app.models import db, Goal, GoalNote
from app.forms import CreateGoalNoteForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

goal_note_routes = Blueprint("goal_notes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@goal_note_routes.route('/<int:goal_id>')
@login_required
def fetch_goal_notes_by_goal_id(goal_id):
    note = GoalNote.query.filter(GoalNote.goal_id==goal_id).first()
    if note:
        return note.to_dict(), 200
    else:
        return {'message': f'No note was found'}, 404

@goal_note_routes.route('/', methods=['POST'])
@login_required
def create_goal_note():
    form = CreateGoalNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note_body = ""
        if form.data['note_body']:
            note_body = form.data['note_body']
        goal_id = request.form['goal_id']
        new_note = GoalNote(
            goal_id=goal_id,
            note_body=note_body
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@goal_note_routes.route('/', methods=['PUT'])
# @login_required
def edit_goal_note():
    print("hi**************")
    form = CreateGoalNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        goal_id = request.form["goal_id"]
        note_to_edit = GoalNote.query.filter(GoalNote.goal_id == goal_id).first()


        if note_to_edit:
            note_to_edit.note_body = form.data['note_body']
            note_to_edit.updated_at = datetime.utcnow()
            db.session.commit()
            return note_to_edit.to_dict()
        else:
            return {'errors': 'Note not found'}, 404
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @goal_note_routes.route('/', methods=['PUT'])
# @login_required
# def clear_goal_note():
#     goal_id = request.form["goal_id"]
#     note_to_clear = GoalNote.query.filter(goal_id == GoalNote.goal_id).first()

#     if note_to_clear:
#         note_to_clear.note_body = ""
#         note_to_clear.updated_at = datetime.utcnow()
#         db.session.commit()
#         return {'message': 'Note cleared successfully'}
#     else:
#         return {'error': 'Note not found'}, 404

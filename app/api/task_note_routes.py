from flask import Blueprint, jsonify, session, request
from app.models import db, TaskNote
from app.forms import CreateTaskNoteForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

task_note_routes = Blueprint("tasknotes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@task_note_routes.route('/<int:task_id>')
@login_required
def fetch_task_notes_by_task_id(task_id):
    note = TaskNote.query.filter(TaskNote.task_id==task_id).first()
    if note:
        return note.to_dict(), 200
    else:
        return {'errors': [f'No note was found']}, 404

@task_note_routes.route('/', methods=['POST'])
@login_required
def create_task_note():
    form = CreateTaskNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note_body = ""
        if form.data['note_body']:
            note_body = form.data['note_body']
            note_style = form.data['note_style']
        task_id = request.form['task_id']
        new_note = TaskNote(
            task_id=task_id,
            note_body=note_body,
            note_style=note_style
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_note_routes.route('/', methods=['PUT'])
@login_required
def edit_task_note():

    form = CreateTaskNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # task_id = request.form["task_id"]
        task_id = form.data["task_id"]
        note_to_edit = TaskNote.query.filter(TaskNote.task_id == task_id).first()


        if note_to_edit:
            note_to_edit.note_body = form.data['note_body']
            note_to_edit.note_style = form.data['note_style']
            note_to_edit.updated_at = datetime.utcnow()
            db.session.commit()
            return note_to_edit.to_dict()
        else:
            return {'errors': ['Note not found']}, 404
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

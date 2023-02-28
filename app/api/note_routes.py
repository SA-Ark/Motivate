from flask import Blueprint, jsonify, session, request
from app.models import db, Goal, GoalNote
from app.forms import CreateGoalNoteForm
from flask_login import current_user, login_user, logout_user, login_required

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

@goal_note_routes.route('/api/goalnotes/<int:goal_id>')
@login_required
def fetch_goal_notes_by_goal_id(goal_id):
    notes = GoalNote.query.filter_by(goal_id=goal_id).all()
    return jsonify([note.to_dict() for note in notes])

@goal_note_routes.route('/api/goalnotes', methods=['POST'])
@login_required
def create_goal_note():
    form = CreateGoalNoteForm()

    if form.validate_on_submit():
        goal_id = form.data['goal_id']
        note_body = form.data['note_body']
        new_note = GoalNote(
            goal_id=goal_id,
            note_body=note_body
        )
        db.session.add(new_note)
        db.session.commit()
        return jsonify(new_note.to_dict())
    else:
        return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

@goal_note_routes.route('/api/goalnotes/<int:goal_note_id>', methods=['PUT'])
@login_required
def edit_goal_note(goal_note_id):
    note_to_edit = GoalNote.query.get_or_404(goal_note_id)
    note_body = request.json.get('note_body')

    if note_to_edit:
        note_to_edit.note_body = note_body
        note_to_edit.updated_at = datetime.utcnow()
        db.session.commit()
        return jsonify(note_to_edit.to_dict())
    else:
        return jsonify({'error': 'Note not found'}), 404

@goal_note_routes.route('/api/goalnotes/<int:goal_note_id>', methods=['DELETE'])
@login_required
def delete_goal_note(goal_note_id):
    note_to_delete = GoalNote.query.get_or_404(goal_note_id)

    if note_to_delete:
        db.session.delete(note_to_delete)
        db.session.commit()
        return jsonify({'message': 'Note deleted successfully'})
    else:
        return jsonify({'error': 'Note not found'}), 404
Note that the validation_errors_to_error_messages function should also be included in this file to handle any form validation errors.





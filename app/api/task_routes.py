from flask import Blueprint, jsonify, session, request
from app.models import db, Goal, TaskNote, Task
from app.forms import CreateTaskForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

task_routes = Blueprint("tasks", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@task_routes.route('/<int:goal_id>', methods=['GET'])
@login_required
def get_all_tasks_for_a_goal(goal_id):

    tasks = task.query.filter(task.goal_id == goal_id).all()
    task_list = {}
    for task in tasks:
        task_list[task.id] = task.to_dict()
    return task_list, 200

@task_routes.route('/<int:task_id>', methods=['GET'])
@login_required
def get_task_by_id(task_id):
    task = task.query.get(task_id)
    if task and task.user_id == current_user.id:
        return task.to_dict(), 200
    else:
        return {'errors': f'This task was not found'}, 404

@task_routes.route('/', methods=['POST'])
@login_required
def create_task():
    form = CreateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        # Get the form data
        new_task = Task(
            user_id = current_user.id,
            name=form.name.data,
            description=form.description.data,
            difficulty=form.difficulty.data,
            priority=form.priority.data,
            tags=form.tags.data,
            parent_task_id = form.parent_task_id.data,
            due_date=form.due_date.data,

        )
        db.session.add(new_task)
        db.session.commit()

        db.session.commit()
        style = '{"blocks":[{"key":"cr1ke","text":"                                                                                     General:                                                                                  ","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":175,"style":"BOLD"},{"offset":85,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"88mi","text":"                                                                            ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":76,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8vuee","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7u67h","text":"                                                                            Resources & Links:","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":94,"style":"BOLD"},{"offset":76,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"c0fbs","text":"                                                                                     ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":85,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9olma","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eursi","text":"                                                                                    Journal:","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":92,"style":"BOLD"},{"offset":84,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"46i5a","text":"","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
        new_note = TaskNote(
            task_id = new_task.id,
            note_style = style,
            note_body = 'General: Resources & Links: Journal:'
        )
        db.session.add(new_note)
        db.session.commit()

        return new_task.to_dict(), 201
    else:
       return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def edit_task(task_id):
    form = CreateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        prev_task = Task.query.get(task_id)
        # Get the form data
        prev_task.name = form.name.data
        prev_task.description = form.description.data
        prev_task.difficulty = form.difficulty.data
        prev_task.importance = form.importance.data
        prev_task.tags = form.tags.data
        prev_task.due_date = form.due_date.data

        db.session.commit()


        # Return a dictionary with the updated task data

        return prev_task.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    del_task = Task.query.get(task_id)
    note = TaskNote.query.filter(TaskNote.task_id == task_id).first()

    if del_task:
        tasks = [del_task]

        if note:
            db.session.delete(note)
        if del_task.parent_task_id:
            parent = Task.query.get(del_task.parent_task_id)
            parent.child_task_id = None
        db.session.commit()
        return {'message': f'task has been successfully deleted'}, 200
    else:
        return {'errors': "task to delete was not found"}, 404

@task_routes.route('/complete/<int:task_id>', methods=['PUT'])
@login_required
def complete_task(task_id):
    task = task.query.get(task_id)
    task.finished_on= datetime.now()
    if not task.parent_task_id:
        badge = Badge(
        user_id = current_user.id,
        task_id = task.id,
        name = task.name,
        description = task.description,
        level = 1
        )
        db.session.add(badge)
    else:
        badge = Badge.query.filter(Badge.task_id == task.parent_task_id).first()

        badge.task_id = task_id
        badge.name = task.name
        badge.description= badge.description + f'\n {task.description}'
        badge.level= badge.level +1
    db.session.commit()
    return task.to_dict(), 200

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


# @task_routes.route('/<int:goal_id>', methods=['GET'])
# @login_required
# def get_all_tasks_for_a_goal(goal_id):

#     tasks = task.query.filter(task.goal_id == goal_id).all()
#     task_list = {}
#     for task in tasks:
#         task_list[task.id] = task.to_dict()
#     return task_list, 200

@task_routes.route('/<int:task_id>', methods=['GET'])
@login_required
def get_task_by_id(task_id):
    task = Task.query.get(task_id)
    if task and task.user_id == current_user.id:
        return task.to_dict(), 200
    else:
        return {'errors': f'This task was not found'}, 404

@task_routes.route('/<int:goal_id>', methods=['POST'])
@login_required
def create_task(goal_id):
    form = CreateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        # Get the form data
        new_task = Task(
            user_id = current_user.id,
            goal_id = goal_id,
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
        if new_task.parent_task_id:
            parent_task = Task.query.get(new_task.parent_task_id)
            completion = parent_task.completion_percent/100
            comp_tasks = Task.query.filter(Task.parent_task_id == parent_task.id).all()
            denominator = 0
            for task in comp_tasks:
                if task.difficulty == "Easy":
                    denominator+=1
                if task.difficulty == "Medium":
                    denominator+=2
                if task.difficulty == "Hard":
                    denominator+=3
            numerator = int(completion*denominator)
            if new_task.difficulty == "Easy":
                denominator+=1
            if new_task.difficulty == "Medium":
                denominator+=2
            if new_task.difficulty == "Hard":
                denominator+=3
            parent_task.completion_percent = (numerator/denominator)*100

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
        prev_task.priority = form.priority.data
        prev_task.tags = form.tags.data
        prev_task.due_date = form.due_date.data

        db.session.commit()

        if prev_task.parent_task_id:
            parent_task = Task.query.get(prev_task.parent_task_id)
            completion = parent_task.completion_percent/100
            comp_tasks = Task.query.filter(Task.parent_task_id == parent_task.id).all()
            denominator = 0
            for task in comp_tasks:
                if task.difficulty == "Easy":
                    denominator+=1
                if task.difficulty == "Medium":
                    denominator+=2
                if task.difficulty == "Hard":
                    denominator+=3
            numerator = int(completion*denominator)
            if prev_task.difficulty == "Easy":
                denominator+=1
            if prev_task.difficulty == "Medium":
                denominator+=2
            if prev_task.difficulty == "Hard":
                denominator+=3
            parent_task.completion_percent = (numerator/denominator)*100

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
        parent = Task.query.filter(Task.parent_task_id == del_task.id).first()
        if parent:
            comp_tasks = Task.query.filter(Task.parent_task_id == parent.id).all()
            denominator = 0
            for task in comp_tasks:
                if task.difficulty == "Easy":
                    denominator+=1
                if task.difficulty == "Medium":
                    denominator+=2
                if task.difficulty == "Hard":
                    denominator+=3
            parent_completion = parent.completion_percent
            parent_completion = parent_completion/100
            numerator = int(parent_completion*denominator)
            if del_task.difficulty == "Easy":
                denominator-=1
            if del_task.difficulty == "Medium":
                denominator-=2
            if del_task.difficulty == "Hard":
                denominator-=3
            if denominator !=0:
                parent.completion_percent = (numerator/denominator)*100
        all_tasks = []
        tasks = Task.query.filter(Task.parent_task_id == del_task.id).all()
        while tasks:
            for i in range(len(tasks)):
                new_tasks = Task.query.filter(Task.parent_task_id==tasks[i].id).all()
                if len(new_tasks):
                    tasks.append(*new_tasks)
                all_tasks.append(tasks.pop(i))
        for task in all_tasks:
            note = TaskNote.query.filter(TaskNote.task_id == task.id).first()
            if note:
                db.session.delete(note)
            db.session.delete(task)
        db.session.delete(del_task)
        db.session.commit()
        return {'message': f'task has been successfully deleted'}, 200
    else:
        return {'errors': "task to delete was not found"}, 404

@task_routes.route('/complete/<int:task_id>', methods=['PUT'])
@login_required
def complete_task(task_id):
    task = Task.query.get(task_id)
    task.finished_on= datetime.now()
    if task.parent_task_id:
        parent = Task.query.get(Task.id==task.parent_task_id).first()
        total_tasks = Task.query.get(Task.parent_task_id == parent.id).all()
        points = 0
        add_pt = 0
        if task.difficulty == "Easy":
                add_pt=1
        if task.difficulty == "Medium":
                add_pt=2
        if task.difficulty == "Hard":
                add_pt=3
        for task in total_tasks:
            if task.difficulty == "Easy":
                points+=1
            if task.difficulty == "Medium":
                points+=2
            if task.difficulty == "Hard":
                points+=3
        curr_completion = parent.completion_percent
        parent.completion_percent = curr_completion + (add_pt/points)*100
    else:
        task.completion_percent = 100
    db.session.commit()
    return task.to_dict(), 200

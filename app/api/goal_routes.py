from flask import Blueprint, jsonify, session, request
from app.models import db, Goal, GoalNote, Badge, Task
from app.forms import CreateGoalForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

goal_routes = Blueprint("goals", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@goal_routes.route('/', methods=['GET'])
@login_required
def get_all_goals():
    goals = Goal.query.filter(Goal.user_id == current_user.id).all()
    goal_list = {}
    for goal in goals:
        goal_list[goal.id]= goal.to_dict()
    return goal_list, 200

@goal_routes.route('/<int:goal_id>', methods=['GET'])
@login_required
def get_goal_by_id(goal_id):
    goal = Goal.query.get(goal_id)
    if goal and goal.user_id == current_user.id:
        return goal.to_dict(), 200
    else:
        return {'errors': f'This goal was not found'}, 404




@goal_routes.route('/', methods=['POST'])
@login_required
def create_goal():
    form = CreateGoalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        # Get the form data
        print(form.due_date.data, "*******")
        new_goal = Goal(
            user_id = current_user.id,
            name=form.name.data,
            description=form.description.data,
            difficulty=form.difficulty.data,
            importance=form.importance.data,
            tags=form.tags.data,
            due_date= form.due_date.data,
            recurring_goal=form.recurring_goal.data,
            parent_goal_id = form.parent_goal_id.data
        )
        db.session.add(new_goal)
        db.session.commit()
        if new_goal.parent_goal_id:
            parent_goal = Goal.query.get(new_goal.parent_goal_id)
            parent_goal.child_goal_id = new_goal.id
        db.session.commit()
        style = '{"blocks":[{"key":"cr1ke","text":"                                                                                     General:                                                                                  ","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":175,"style":"BOLD"},{"offset":85,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"88mi","text":"                                                                            ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":76,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8vuee","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7u67h","text":"                                                                            Resources & Links:","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":94,"style":"BOLD"},{"offset":76,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"c0fbs","text":"                                                                                     ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":85,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9olma","text":"","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eursi","text":"                                                                                    Journal:","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":92,"style":"BOLD"},{"offset":84,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"46i5a","text":"","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
        new_note = GoalNote(
            goal_id = new_goal.id,
            note_style = style,
            note_body = 'General: Resources & Links: Journal:'
        )
        db.session.add(new_note)
        db.session.commit()

        return new_goal.to_dict(), 201
    else:
       return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@goal_routes.route('/<int:goal_id>', methods=['PUT'])
@login_required
def edit_goal(goal_id):
    form = CreateGoalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        prev_goal = Goal.query.get(goal_id)
        # Get the form data
        prev_goal.name = form.name.data
        prev_goal.description = form.description.data
        prev_goal.difficulty = form.difficulty.data
        prev_goal.importance = form.importance.data
        prev_goal.tags = form.tags.data
        prev_goal.due_date = form.due_date.data

        db.session.commit()


        # Return a dictionary with the updated goal data

        return prev_goal.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@goal_routes.route('/<int:goal_id>', methods=['DELETE'])
@login_required
def delete_goal(goal_id):
    del_goal = Goal.query.get(goal_id)
    note = GoalNote.query.filter(GoalNote.goal_id == goal_id).first()
    badge = Badge.query.filter(Badge.goal_id == goal_id).first()
    if del_goal:
        if note:
            db.session.delete(note)
        if badge:
            db.session.delete(badge)
        if del_goal.parent_goal_id:
            parent = Goal.query.get(del_goal.parent_goal_id)
            parent.child_goal_id = None
        db.session.delete(del_goal)
        db.session.commit()
        return {'message': f'Goal has been successfully deleted'}, 200
    else:
        return {'errors': "Goal to delete was not found"}, 404

@goal_routes.route('/complete/<int:goal_id>', methods=['PUT'])
@login_required
def complete_goal(goal_id):
    goal = Goal.query.get(goal_id)
    goal.finished_on= datetime.now()
    if not goal.parent_goal_id:
        badge = Badge(
        user_id = current_user.id,
        goal_id = goal.id,
        name = goal.name,
        description = goal.description,
        level = 1
        )
        db.session.add(badge)
    else:
        badge = Badge.query.filter(Badge.goal_id == goal.parent_goal_id).first()

        badge.goal_id = goal_id
        badge.name = goal.name
        # badge.description= badge.description + f'\n {goal.description}'
        badge.description = goal.description
        badge.level= badge.level +1
    db.session.commit()
    return goal.to_dict(), 200


@goal_routes.route('/tasks/<int:goal_id>', methods=['GET'])
@login_required
def get_all_tasks_for_a_goal(goal_id):

    tasks = Task.query.filter(Task.goal_id == goal_id).all()
    task_list = {}
    for task in tasks:
        task_list[task.id] = task.to_dict()
    return task_list, 200

from flask import Blueprint, jsonify, session, request
from app.models import db, Goal
from app.forms import CreateGoalForm
from flask_login import current_user, login_user, logout_user, login_required

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
        return {'message': f'This goal was not found'}, 404




@goal_routes.route('/', methods=['POST'])
@login_required
def create_goal():
    form = CreateGoalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        # Get the form data
        new_goal = Goal(
            user_id = current_user.id,
            name=form.name.data,
            description=form.description.data,
            difficulty=form.difficulty.data,
            importance=form.importance.data,
            tags=form.tags.data,
            due_date=form.due_date.data
        )

        db.session.add(new_goal)
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
        prev_goal.finished_on = form.finished_on.data

        db.session.commit()


        # Return a dictionary with the updated goal data

        return prev_goal.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@goal_routes.route('/<int:goal_id>', methods=['DELETE'])
@login_required
def delete_goal(goal_id):
   del_goal = Goal.query.get(goal_id)

   db.session.delete(del_goal)
   db.session.commit()
   return {'message': f'Goal has been successfully deleted'}, 200

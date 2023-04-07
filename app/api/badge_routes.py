from flask import Blueprint, jsonify, session, request
from app.models import db, Goal, Badge
from app.forms import CreateGoalForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime


badge_routes = Blueprint("badges", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@badge_routes.route('/', methods=['GET'])
@login_required
def get_all_badges():
    badges = Badge.query.filter(Badge.user_id == current_user.id).all()
    badge_list = {}
    for badge in badges:
        badge_list[badge.id] = badge.to_dict()
    return badge_list, 200

@badge_routes.route('/<int:badge_id>', methods=['GET'])
@login_required
def get_badge_by_id(badge_id):
    badge = Badge.query.get(badge_id)
    if badge and badge.user_id == current_user.id:
        return badge.to_dict(), 200
    else:
        return {'errors': f'This badge was not found'}, 404

@badge_routes.route('/<int:badge_id>/goals', methods=['GET'])
@login_required
def get_prev_badge_goals(badge_id):
    badge = Badge.query.get(badge_id)
    goals = {}
    if badge and badge.user_id == current_user.id:
        level = badge.level
        while level > 0:
            goal = Goal.query.get(badge.goal_id)
            goals[level] = goal.to_dict()
            level-=1
        return goals, 200
    else:
        return {'errors': f'This badge was not found'}, 404

@badge_routes.route('/<int:badge_id>/nextgoal', methods=['GET'])
@login_required
def get_next_badge_goal(badge_id):
    badge = Badge.query.get(badge_id)

    if badge and badge.user_id == current_user.id:
        goal = Goal.query.get(badge.goal_id)
        next_goal = Goal.query.get(goal.child_goal_id)
        if next_goal:
            return next_goal, 200
        else:
            return {'errors': f'This goal does not have a next goal currently associated with it.'}, 404

    else:
        return {'errors': f'This badge was not found'}, 404

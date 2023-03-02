from flask.cli import AppGroup
from .users import seed_users, undo_users
from .goals import seed_goals, undo_goals
from .goal_notes import seed_goal_notes, undo_goal_notes
# from .goal_shares import seed_goal_shares, undo_goal_shares
from .tasks import seed_tasks, undo_tasks
from .task_notes import seed_task_notes, undo_task_notes
from .badges import seed_badges, undo_badges
from .paymentInfo import seed_payment_infos, undo_payment_infos

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_badges()
        undo_task_notes()
        undo_tasks()
        # undo_goal_shares()
        undo_goal_notes()
        undo_goals()
        undo_payment_infos()
        undo_users()

    seed_users()
    seed_goals()
    seed_goal_notes()
    # seed_goal_shares()
    seed_tasks()
    seed_task_notes()
    seed_badges()
    seed_payment_infos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_badges()
    undo_task_notes()
    undo_tasks()
    # undo_goal_shares()
    undo_goal_notes()
    undo_goals()
    undo_payment_infos()
    undo_users()
    # Add other undo functions here

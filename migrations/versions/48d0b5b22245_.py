"""empty message

Revision ID: 48d0b5b22245
Revises:
Create Date: 2023-04-02 11:15:19.678886

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '48d0b5b22245'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('parent_goal_id', sa.Integer(), nullable=True),
    sa.Column('child_goal_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('edit_access', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.String(length=50), nullable=True),
    sa.Column('importance', sa.String(length=50), nullable=True),
    sa.Column('completion_percent', sa.Integer(), nullable=False),
    sa.Column('tags', sa.String(length=255), nullable=True),
    sa.Column('recurring_goal', sa.Boolean(), nullable=False),
    sa.Column('due_date', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('finished_on', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['child_goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['parent_goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE goals SET SCHEMA {SCHEMA};")

    op.create_table('payment_infos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('billing_address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('zip', sa.String(length=255), nullable=False),
    sa.Column('country', sa.String(length=255), nullable=False),
    sa.Column('card_number', sa.String(), nullable=False),
    sa.Column('expiry', sa.Date(), nullable=False),
    sa.Column('cvc', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE payment_infos SET SCHEMA {SCHEMA};")

    op.create_table('badges',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('goal_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE badges SET SCHEMA {SCHEMA};")

    op.create_table('goal_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('goal_id', sa.Integer(), nullable=False),
    sa.Column('note_body', sa.Text(), nullable=True),
    sa.Column('note_style', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE goal_notes SET SCHEMA {SCHEMA};")

    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('goal_id', sa.Integer(), nullable=False),
    sa.Column('parent_task_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('edit_access', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.String(length=255), nullable=True),
    sa.Column('priority', sa.String(length=255), nullable=True),
    sa.Column('completion_percent', sa.Integer(), nullable=False),
    sa.Column('tags', sa.String(length=255), nullable=True),
    sa.Column('due_date', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('finished_on', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['parent_task_id'], ['tasks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE tasks SET SCHEMA {SCHEMA};")

    op.create_table('task_notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=False),
    sa.Column('note_body', sa.String(length=255), nullable=True),
    sa.Column('note_style', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE task_notes SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task_notes')
    op.drop_table('tasks')
    op.drop_table('goal_notes')
    op.drop_table('badges')
    op.drop_table('payment_infos')
    op.drop_table('goals')
    op.drop_table('users')
    # ### end Alembic commands ###

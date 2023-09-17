"""empty message

Revision ID: d135acd5598f
Revises: 
Create Date: 2023-09-15 13:28:33.567645

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd135acd5598f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('disease_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('definition', sa.Text(), nullable=False),
    sa.Column('care_method', sa.Text(), nullable=False),
    sa.Column('symptoms', sa.Text(), nullable=False),
    sa.Column('treatment_process', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hospital_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('phone_num', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('hospital_info')
    op.drop_table('disease_info')
    # ### end Alembic commands ###
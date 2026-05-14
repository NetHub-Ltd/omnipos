"""restore missing migration

Revision ID: 85b7bdbefe21
Revises: 9c1f3ee55b3d
Create Date: 2026-05-08 15:20:02.146716

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'b4a88843194f'
down_revision: Union[str, Sequence[str], None] = '9c1f3ee55b3d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass

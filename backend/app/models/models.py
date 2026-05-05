
"""
MVP POS CORE SCHEMA (CLEAN + ENUM ENFORCED)

GOAL:
- minimal tables
- strict where it matters
- flexible where it must remain flexible
"""
import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from uuid import UUID

from sqlalchemy import Column, Enum as SAEnum
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field, Relationship

from app.models.base import BaseMixin
from app.schemas.enums import CategoryType, SaleStatus, PaymentMethod
from app.utils.helpers import utc_now


class Business(BaseMixin, table=True):
    __tablename__ = "businesses"
    tenant_id: UUID = Field(index=True)
    name: str = Field(index=True, unique=True)
    active: bool = Field(index=True, default=False)

# =========================================================
# 1. CATEGORY
# =========================================================
class Product(BaseMixin, table=True):
    __tablename__ = "products"
    business_id: UUID = Field(foreign_key="businesses.id", index=True)
    name: str
    price: float
    # Changed to float to allow 1.5kg or 0.75 litres
    stock: float = 0.0
    active: bool = Field(index=True, default=True)
    # Everything else goes here (barcode, category, uom, expiry)
    attributes: Dict[str, Any] = Field(
        sa_column=Column(JSONB),
        default_factory=dict
    )



# =========================================================
# 3. SALE
# =========================================================
class Sale(BaseMixin, table=True):
    """
    FINANCIAL TRANSACTION ROOT
    """
    __tablename__ = "sales"
    business_id: UUID = Field(foreign_key="businesses.id", index=True)
    status: SaleStatus = Field(
        sa_column=Column(SAEnum(SaleStatus, name="sale_status_enum")),
        default=SaleStatus.COMPLETED
    )

    total_amount: float

    created_at: datetime = Field(default_factory=utc_now)
    payments: List["Payment"] = Relationship(back_populates="sale")


# =========================================================
# 5. PAYMENT
# =========================================================
class Payment(BaseMixin, table=True):
    """
    MONEY RECEIVED FOR SALES
    """
    __tablename__ = "payments"
    business_id: UUID = Field(foreign_key="businesses.id", index=True)
    sale_id: UUID = Field(foreign_key="sales.id", index=True)

    amount: float

    method: PaymentMethod = Field(
        sa_column=Column(SAEnum(PaymentMethod, name="payment_method_enum"))
    )

    reference: Optional[str] = None
    sale: Optional[Sale] = Relationship(back_populates="payments")
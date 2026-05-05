from fastapi import APIRouter

router = APIRouter()


@router.post("/")
async def create_payment():
    """
    POST /payments

    PURPOSE:
    --------
    Record a payment against a sale transaction.

    CORE RESPONSIBILITY:
    --------------------
    - Link payment to a sale
    - Store payment method and amount
    - Track payment status
    - Support partial or full payments (future-proof)

    REQUEST BODY:
    --------------
    {
        "sale_id": int,
        "amount": float,
        "payment_method": str,
        "reference": str | null
    }

    RESPONSE:
    ---------
    {
        "id": int,
        "sale_id": int,
        "amount": float,
        "payment_method": str,
        "status": "completed",
        "created_at": datetime
    }

    RULES:
    ------
    - MUST validate sale exists
    - MUST NOT exceed outstanding balance (if enforced)
    - MUST be linked to a single sale
    - MUST NOT modify sale items or pricing
    """
    pass


@router.get("/")
async def list_payments():
    """
    GET /payments

    PURPOSE:
    --------
    Retrieve a list of recorded payments.

    USE CASES:
    ----------
    - Financial reporting
    - Reconciliation (e.g., M-Pesa matching)
    - Admin dashboards

    QUERY PARAMETERS (optional):
    ----------------------------
    - sale_id: int
    - payment_method: str
    - start_date: date
    - end_date: date
    - limit: int
    - offset: int

    RESPONSE:
    ---------
    [
        {
            "id": int,
            "sale_id": int,
            "amount": float,
            "payment_method": str,
            "status": str,
            "created_at": datetime
        }
    ]

    RULES:
    ------
    - MUST be lightweight
    - MUST NOT include sale item details
    """
    pass


@router.get("/{payment_id}")
async def get_payment_detail(payment_id: int):
    """
    GET /payments/{payment_id}

    PURPOSE:
    --------
    Retrieve detailed information about a single payment.

    USE CASES:
    ----------
    - Payment audit
    - Reconciliation checks
    - Customer dispute resolution

    RESPONSE:
    ---------
    {
        "id": int,
        "sale_id": int,
        "amount": float,
        "payment_method": str,
        "reference": str | null,
        "status": str,
        "created_at": datetime
    }

    RULES:
    ------
    - MUST NOT expose unrelated sale data
    - MUST remain immutable once recorded
    """
    pass


@router.post("/{payment_id}/refund")
async def refund_payment(payment_id: int):
    """
    POST /payments/{payment_id}/refund

    PURPOSE:
    --------
    Reverse a payment and restore financial balance.

    USE CASES:
    ----------
    - Customer refund
    - Failed transaction reversal
    - Payment correction

    REQUEST BODY:
    --------------
    {
        "reason": str
    }

    RESPONSE:
    ---------
    {
        "payment_id": int,
        "status": "refunded"
    }

    RULES:
    ------
    - MUST NOT delete payment record
    - MUST maintain audit trail
    - MUST update related sale payment state
    """
    pass
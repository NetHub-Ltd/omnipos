---
# 📦 POS MVP — Sales + M-Pesa Reconciliation System

A lightweight, extensible MVP for handling **sales, inventory tracking, and M-Pesa payment reconciliation**.
Built for rapid deployment and real-world validation with a single client before scaling into a full SaaS POS system.
---

# 🚀 Overview

This system focuses on solving three core business problems:

- Fast and simple **sales processing**
- Reliable **M-Pesa payment tracking & reconciliation**
- Basic **inventory visibility**

It intentionally avoids over-engineering to allow **fast iteration and real-world feedback**.

---

# 🧱 Tech Stack

## Backend

- FastAPI
- SQLModel
- SQLAlchemy (async)
- asyncpg
- Pydantic Settings

## Database

- PostgreSQL 15

## Infrastructure

- Docker
- Docker Compose

---

# 📁 Project Structure

```
app/
├── main.py                 # FastAPI entrypoint
│
├── core/
│   ├── config.py          # Environment configuration
│   ├── database.py        # Async DB session setup
│
├── models/                # Database models (SQLModel)
│   ├── product.py
│   ├── sale.py
│   ├── payment.py
│
├── api/
│   ├── router.py          # Central router
│   ├── routes/
│       ├── products.py
│       ├── sales.py
│       ├── payments.py
│
├── utils/
│   └── enums.py           # Shared enums (PaymentMethod, Status)
```

---

# ⚙️ Setup & Installation

## 1. Clone or extract project

```bash
unzip pos-mvp.zip
cd pos-mvp
```

---

## 2. Start services

```bash
docker-compose up --build
```

This will start:

- FastAPI backend → `http://localhost:8000`
- PostgreSQL database → `localhost:5432`

---

## 3. Access API docs

Open:

```
http://localhost:8000/docs
```

Swagger UI will allow you to test all endpoints.

---

# 🗄️ Database Design

## Products

- Stores inventory items
- Fields:
  - id
  - name
  - price
  - stock

---

## Sales

- Represents a completed transaction
- Fields:
  - id
  - total_amount
  - created_at

---

## Sale Items (planned extension)

- Links products to a sale
- Supports multiple items per transaction

---

## Payments

- Tracks payment per sale
- Supports M-Pesa reconciliation

Fields:

- id
- sale_id
- amount
- method (CASH | MPESA)
- mpesa_code (nullable)
- status (PENDING | MATCHED | FAILED)

---

# 🔁 Core Workflows

## 1. Product Management

### Create product

```http
POST /products
```

### Fetch products

```http
GET /products
```

---

## 2. Sales Flow (MVP stage placeholder)

```text
Create Sale → Attach Items → Compute Total → Store Sale
```

Endpoint:

```http
POST /sales
```

---

## 3. Payment Flow

```text
Create Payment → Attach to Sale → (Optional) M-Pesa Code → Status Tracking
```

Endpoint:

```http
POST /payments
```

---

## 4. M-Pesa Reconciliation (Future Logic)

Planned behavior:

- Match `mpesa_code` + `amount` against sale total
- Auto-update payment status:
  - MATCHED
  - PENDING
  - FAILED

---

# 🧠 Design Principles

## 1. Keep business logic out of routes

All complex logic should move into `/services` (future enhancement).

---

## 2. Async-first architecture

All DB operations use async sessions for scalability.

---

## 3. Simple before scalable

This MVP prioritizes:

- Speed of delivery
- Real-world feedback
- Iterative improvement

---

# 🧪 Development Workflow

## Run locally

```bash
docker-compose up --build
```

## Rebuild after changes

```bash
docker-compose down
docker-compose up --build
```

---

## API Testing

Use:

- Swagger UI → `/docs`
- Postman (optional)

---

# 🧩 Planned Enhancements

## Phase 2 (after validation)

- Full checkout flow (cart system)
- Sale items implementation
- Receipt generation
- Daily reporting dashboard

## Phase 3

- M-Pesa API integration (Daraja)
- Auto reconciliation
- User roles (cashier/admin)

## Phase 4

- Multi-branch support
- Offline mode
- Analytics dashboard

---

# ⚠️ Known Limitations (MVP)

- No authentication system yet
- No sale-item relationships implemented
- No UI (API-only backend)
- No automated M-Pesa integration

---

# 🎯 Success Criteria

This MVP is considered successful if:

- Sales can be recorded reliably
- Payments can be tracked manually
- M-Pesa reconciliation can be partially automated or assisted
- Client can actively use it in daily operations

---

# 👨‍💻 Notes for Developers

- Extend logic in `/services` (do NOT overload routes)
- Keep models thin and clean
- Prefer explicit flows over magic abstractions
- Validate everything at API boundary

---

# 📌 Quick Start Summary

```bash
docker-compose up --build
```

Then open:

```
http://localhost:8000/docs
```

---

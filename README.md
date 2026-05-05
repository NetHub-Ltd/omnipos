OmniPOS is a high-performance, functional-first Point of Sale (POS) system built as a Progressive Web App (PWA). It is designed to scale from a single-store MVP into a comprehensive multi-tenant ecosystem that bridges the gap between retail operations and supply chain logistics.

## 🚀 The Vision

OmniPOS aims to be more than just a cash register. It is a **Unified Commerce Engine** featuring:

- **Multi-Tenant Architecture:** Securely manage multiple business branches or diverse industries from a single dashboard.
- **B2B Marketplace:** A dedicated space for wholesalers to offer competitive pricing to business owners.
- **Supply Chain Integration:** Targeted wholesale advertising based on real-time inventory needs.
- **Global & Local Payments:** Integrated support for M-Pesa, Credit/Debit Cards, and PayPal.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Offline-first cart logic)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **PWA:** [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa)
- **Backend (Future):** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database (Future):** PostgreSQL with Row-Level Security (RLS) for multi-tenancy.

## 📱 Features (MVP)

- **Optimized Selection Grid:** High-speed product selection designed for tablets and desktops.
- **Streamlined Checkout:** Focused payment flow supporting Cash and Mobile Pay.
- **PWA Ready:** Installable on any device with offline resilience.
- **Functional-First UI:** A minimalist, high-contrast theme focused on reducing operator fatigue.

## 🏗️ Project Structure

```text
├── app/                # Next.js App Router (UI & Routing)
├── components/         # Reusable UI components (Grid, Cart, Modals)
├── store/              # Zustand state stores (Cart, Auth, Inventory)
├── public/             # Static assets & PWA manifest
├── middleware.ts       # Route protection & Auth logic
└── next.config.mjs     # PWA & Build configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/your-username/omnipos.git](https://github.com/your-username/omnipos.git)
   cd omnipos
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗺️ Roadmap

- [x] UI/UX Wireframes & High-Fidelity Design
- [ ] Implement Zustand Cart Logic
- [ ] Configure PWA for offline support
- [ ] Build FastAPI Multi-tenant Backend
- [ ] Integrate M-Pesa Daraja API
- [ ] Launch B2B Wholesale Marketplace

## 📄 License

Internal Project - All Rights Reserved.

## 🙏 Acknowledgments

- Inspired by the need for a modern, scalable POS solution in emerging markets.
- Built with love using the Next.js ecosystem and the vibrant open-source community.
- Special thanks to [ducanh2912](https://github.com/ducanh2912) for the Next.js PWA template.

# Donutshop

An e-commerce platform for custom donut orders, featuring a modern React + TypeScript frontend and a Node.js/Express API gateway backend.

---

## Project Structure

- **craftplan-express-gateway/** — Node.js/Express API gateway (backend)
- **storefront/** — React + TypeScript + Vite app (frontend)
- **ui-prototype/** — HTML/CSS static prototypes

---

## Features

- Custom donut builder and product catalog
- Stripe payment integration
- Order tracking and checkout flows
- API gateway for secure backend communication
- Modern, responsive UI with Tailwind CSS

---

## Prerequisites

| Tool     | Version |
|----------|---------|
| Node.js  | ≥ 18    |
| npm      | ≥ 9     |

---

## Getting Started

### 1. Clone & Install

```bash
git clone <this-repo-url>
cd Donutshop-1
npm install
```

This installs root dependencies and sets up scripts for both backend and frontend.

### 2. Setup Backend (API Gateway)

```bash
cd craftplan-express-gateway
cp .env.example .env
# Edit .env with your Stripe and backend credentials
npm install
```

Start backend in dev mode:

```bash
npm run dev
```

### 3. Setup Frontend (Storefront)

```bash
cd ../storefront
npm install
npm run dev
```

The app will be available at http://localhost:5173 (default Vite port).

---

## Development Scripts

From the project root, you can run both frontend and backend together:

```bash
npm run dev
```

Or run tests for both:

```bash
npm test
```

---

## Folder Details

- **craftplan-express-gateway/**: Express API gateway, Stripe integration, error handling, request logging.
- **storefront/**: React app, product grid, cart, checkout, Tailwind CSS, TypeScript.
- **ui-prototype/**: Static HTML/CSS prototypes for design reference.

---

## License

MIT
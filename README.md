# Areese — Appointment & Team Management Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)

**A full-featured appointment scheduling and team collaboration SaaS platform built with React, TypeScript & Vite.**

</div>

---

## 🚀 Live Demo

| Environment | URL |
|-------------|-----|
| 🌐 **Production** | [https://getdontforget.net](https://getdontforget.net) |
| 🔧 **Staging / Preview** | [https://areese-frontend.vercel.app](https://areese-frontend.vercel.app) |

---

## 🔐 Demo Login Credentials

Use the following credentials to explore the application. No sign-up required.

### 👑 Admin Account
| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@gmail.com`      |
| Password | `Admin@12345`          |
| Role     | Admin                  |

**Admin has access to:** Dashboard, Appointments, Booking Packages, Public Booking, Follow-ups, Team Management, Team Access, Projects, Users, Blog & Categories, Message Templates, Settings, and Profile.

---

### 🤝 Collaborator Account
| Field    | Value                          |
|----------|--------------------------------|
| Email    | `collaborator@gmail.com`       |
| Password | `Collaborator@12345`           |
| Role     | Collaborator                   |

**Collaborator has access to:** Collaborator Dashboard, Projects, and Team Views.

---

## ✨ Features

### 🏠 Public Pages
- **Landing / Home** — Hero section, features showcase, pricing
- **Pricing** — Tiered pricing plans
- **About** — Company information
- **Contact** — Contact form
- **Blog** — Blog listing & categories
- **Privacy Policy & Terms** — Legal pages
- **Public Booking** — Client-facing appointment booking form

### 🔧 Admin Dashboard
- 📊 **Analytics Dashboard** — Stats, charts (Recharts), KPIs
- 📅 **Appointments** — View and manage all appointments
- 📦 **Booking Packages** — Create and manage service packages
- 🌐 **Public Booking** — Manage public booking links
- 🔁 **Follow-Ups** — Track and manage follow-up tasks
- 👥 **Team Access** — Invite and manage collaborators
- 🗂️ **Projects** — Project list with team assignment
- 🗃️ **Team Archive** — View archived teams
- 👤 **Users** — Manage platform users
- 📝 **Message Templates** — Create reusable message templates
- 📰 **Blog & Categories** — Manage blog content
- ⚙️ **Settings** — Integrations, Notifications, Analytics, Branding, Booking Caps, Account
- 🧑‍💼 **Profile Settings** — Update personal profile

### 🤝 Collaborator Dashboard
- Personal dashboard with project overview
- Project and team management

---

## 🛠️ Tech Stack

| Category         | Technology                                      |
|------------------|-------------------------------------------------|
| Framework        | React 19                                        |
| Language         | TypeScript 5.9                                  |
| Build Tool       | Vite 7                                          |
| Styling          | Tailwind CSS v4                                 |
| UI Components    | Radix UI, shadcn/ui, Base UI                    |
| State Management | Redux Toolkit + React Redux                     |
| Routing          | React Router DOM v7                             |
| Forms            | React Hook Form + Zod                           |
| Charts           | Recharts                                        |
| Rich Text Editor | Tiptap                                          |
| Animations       | Framer Motion                                   |
| Icons            | Lucide React, React Icons                       |
| Notifications    | React Toastify, Sonner                          |
| Date Utilities   | date-fns, React Day Picker                      |
| Theming          | next-themes (Dark/Light mode)                   |

---

## 📁 Project Structure

```
areese-frontend/
├── public/
├── src/
│   ├── components/        # Shared & layout components
│   │   ├── layout/        # MainLayout, CollaboratorLayout, Navbar, Sidebar
│   │   └── shared/        # Reusable UI components
│   ├── features/          # Feature-based modules
│   │   ├── Appointment/
│   │   ├── blog/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── publicBooking/
│   │   ├── settings/
│   │   ├── team/
│   │   ├── teamAccess/
│   │   ├── user/
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Route-level page components
│   ├── routes/            # App router & protected routes
│   ├── store/             # Redux store & slices
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.*
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/areese-frontend.git

# 2. Navigate into the project
cd areese-frontend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start development server             |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview the production build       |
| `npm run lint`  | Run ESLint checks                    |

---

## 🚢 Deployment

This project is configured for **Vercel** deployment out of the box via [`vercel.json`](./vercel.json).

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository directly on [vercel.com](https://vercel.com) for automatic CI/CD.

> **Note:** SPA routing is handled via `vercel.json` — all routes redirect to `index.html`.

---

## 🔒 Authentication & Roles

Authentication is handled client-side with localStorage. Two roles are supported:

| Role           | Login Route | Dashboard Route          |
|----------------|-------------|--------------------------|
| `admin`        | `/login`    | `/admin/dashboard`       |
| `collaborator` | `/login`    | `/collaborator/dashboard`|

Protected routes are enforced via [`ProtectedRoute`](./src/routes/ProtectedRoute.tsx) which reads the role from localStorage and redirects unauthorized users.

---

## 📄 License

This project is intended for client use. All rights reserved.

---

<div align="center">
  Built with ❤️ using React + TypeScript + Vite
</div>

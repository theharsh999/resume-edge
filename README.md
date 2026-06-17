# ResumeEdge

> Create Professional Resumes. Get More Interviews.

ResumeEdge is a premium SaaS-style ATS (Applicant Tracking System) Resume Builder built with React, Vite, and Tailwind CSS. It is engineered with a strict dark mode aesthetic, layout rigidity, and clean typographic grids to ensure resumes pass recruitment filters while looking elegant.

## 🚀 Tech Stack

* **Frontend**: React.js (JavaScript)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4 (configured via modern `@theme` directive)
* **Routing**: React Router DOM (v7)
* **Icons**: Lucide React

## 📂 Project Structure

```text
resume-edge/
├── dist/                     # Compiled production assets
├── public/                   # Static public assets
├── src/
│   ├── assets/               # Brand and asset elements
│   ├── components/
│   │   ├── layout/           # Global structures (Navbar, Footer, Layout wrapper)
│   │   └── ui/               # Reusable atomic UI elements (Button, Card, Badge, Container, Section)
│   ├── pages/                # Views (Home, Builder, Templates)
│   ├── routes/               # Navigation definitions (index.jsx)
│   ├── App.jsx               # Application entry point & router context
│   ├── index.css             # Tailwind v4 directives & premium global styling tokens
│   └── main.jsx              # React DOM mounting entrypoint
├── tailwind.config.js        # Legacy reference config (theme configuration runs natively in index.css)
├── postcss.config.js         # PostCSS configuration for @tailwindcss/postcss
├── vite.config.js            # Vite configurations
├── package.json              # Script definitions and dependency mappings
└── README.md                 # Project documentation
```

## 🎨 Design System

ResumeEdge runs a custom design system mapped in [src/index.css](file:///Users/harshpatel/Internship/resume-edge/src/index.css):

* **Primary**: `#6366F1` (Indigo-500)
* **Secondary**: `#8B5CF6` (Violet-500)
* **Background**: `#0F172A` (Slate-900)
* **Surface**: `#111827` (Slate-950)
* **Text**: `#F8FAFC` (Slate-50)
* **Muted**: `#94A3B8` (Slate-400)
* **Success**: `#22C55E` (Green-500)
* **Typography**: Inter (Google Fonts)

## 🛠️ Getting Started

### Installation

Install workspace dependencies:

```bash
npm install
```

### Development Server

Launch the Vite local server:

```bash
npm run dev
```

### Build

Compile production-ready minimized bundles:

```bash
npm run build
```

## 🧱 Reusable UI Components

* **Container**: Standardizes width margins across viewport screens (max 7xl with default side paddings).
* **Section**: Sets vertical padding spaces (`py-12` up to `py-28`) for layouts.
* **Button**: Supports multiple variants (`primary`, `secondary`, `outline`, `ghost`, `success`), sizing, and interactive scale micro-animations.
* **Card**: A clean slate-900 surface with custom-designed borders, glow gradients, and hover highlights.
* **Badge**: Standardized pill labels for category classification or scoring indicators.

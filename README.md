## 🌐 Live Demo

🔗 **Try ResumeEdge:** https://resume-edge-ai.vercel.app/

> Create ATS-friendly resumes, customize templates, analyze resume quality, and export professional PDFs instantly.

## 🚀 Tech Stack

* **Frontend**: React.js (JavaScript)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4 (configured via modern `@theme` directive in CSS)
* **Routing**: React Router DOM (v7)
* **Drag and Drop**: @dnd-kit/core & @dnd-kit/sortable
* **PDF Exporter**: html2canvas + jsPDF
* **Icons**: Lucide React

## 📂 Project Structure

```text
resume-edge/
├── dist/                     # Compiled production assets
├── public/                   # Static public assets
├── src/
│   ├── assets/               # Brand and asset elements
│   ├── components/
│   │   ├── builder/          # Form, preview, switcher, accordion, settings, dnd lists
│   │   ├── layout/           # Global structures (Navbar, Footer, Layout wrapper)
│   │   └── ui/               # Reusable atomic UI elements (Button, Card, Badge, Container, Section, Toast)
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

ResumeEdge runs a custom design system defined in `src/index.css`:

* **Primary**: `#6366F1` (Indigo-500)
* **Secondary**: `#8B5CF6` (Violet-500)
* **Background**: `#0F172A` (Slate-900)
* **Surface**: `#111827` (Slate-950)
* **Text**: `#F8FAFC` (Slate-50)
* **Muted**: `#94A3B8` (Slate-400)
* **Success**: `#22C55E` (Green-500)
* **Typography**: Inter (Google Fonts)

## 🏠 Key Product Features

### 1. Landing Page
* **Hero Section**: Strong ATS marketing tags and trust badges highlighting compliance.
* **Interactive Resume Preview**: A mock editor side-by-side with a preview sheet. Type in the form fields and toggle between **Modern** and **Classic** designs to witness real-time layout rendering.
* **Features Grid (6 Cards)**: Showcases details for ATS Optimizations, Live Syncing, Layout templates, PDF downloads, responsiveness, and guided edit flows.
* **Timeline Workflow**: Visual progression steps showing how to fill, select templates, and download outputs.

### 2. Advanced Templates Gallery (`/templates`)
Showcases 6 designer-crafted, recruiter-approved formats:
* **Modern Accent** (`modern`): Asymmetric grid structure with sidebar contact labels.
* **Executive Classic** (`professional`): serif-centered layout with divider accents.
* **Ultra Minimal** (`minimal`): Zero-margin single column grid.
* **Creative Pro** (`creative`): Vertical color border highlights and custom pills.
* **Executive Premium** (`executive`): Thick border divisions.
* **Compact Fast** (`compact`): Max-density grids for single-page summaries.

### 3. Resume Builder Workspace (`/builder`)
* **3-Column Grid Dashboard**: Includes Form Editor, Live Canvas Preview, and Analytics Dashboard.
* **Live Dynamic Preview**: Side-by-side split screen showing real-time rendering of your input.
* **Collapsible Sections**: Uses an accordion system to group and structure inputs cleanly.
* **Dynamic Input Lists**: Drag-free add and remove triggers for Experience, Projects, Education, and Skills tags.
* **Demo Resume Loader**: One-click action to load pre-filled developer resume data.
* **Local Storage Persistence**: Autosaver synchronizing data dynamically to survive browser refreshes.

### 4. Custom Styling & Reordering
* **Primary Color Themes**: Swaps themes instantly between Indigo, Blue, Emerald, Rose, and Amber.
* **Typography**: Select between three clean fonts (Inter, Poppins, and Roboto).
* **Spacing Density**: Adjust padding density between Comfortable, Balanced, and Compact.
* **Drag-and-Drop Ordering**: Uses `@dnd-kit/sortable` to let users rearrange layout modules (`Summary`, `Skills`, `Experience`, `Projects`, `Education`) by dragging drag-handles.

### 5. Resume Intelligence Dashboard (ATS Analyzer)
* **ATS Score Card**: SVG progress ring counting score out of 100 based on core metrics.
* **Completion Tracker**: Progressive indicator tracking completeness from 0% to 100%.
* **Quality Insights**: Smart suggestions indicating missing credentials, short descriptors, or empty sections.
* **Recruiter Checklist**: Roster listing recruiter standard checklists that tick off live as the user completes fields.
* **PDF Direct Exporter**: Captures preview container, compiling a high-resolution print PDF saved as `ResumeEdge-[Candidate_Name].pdf`.
* **Toast Alerts**: Micro-interactions giving action updates ("Template applied successfully!", "Styling settings updated!", etc.).

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

https://github.com/HeinHtetNyan/My_Portfolio/blob/main/Screenshot%202026-04-19%20010539.png?raw=true
# Portfolio Website

A modern, high-performance, and fully responsive portfolio website built with **React**, **Vite**, and **Tailwind CSS**. Designed with an obsession for detail, featuring smooth page transitions and a minimalist aesthetic.

## 🚀 Tech Stack

- **Frontend:** [React](https://reactjs.org/) (v18)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)

## ✨ Key Features

- **Dynamic Identity:** Easily configurable personal info (name, bio, title) via environment variables.
- **Project Showcases:** Interactive project gallery with detailed case studies.
- **GitHub Integration:** Built-in service to fetch and display repositories.
- **Responsive & Accessible:** Optimized for all devices with clean, semantic HTML.
- **Smooth UX:** Custom page loader, scroll reveal effects, and instant scroll restoration.
- **Contact Form:** Integrated support for Formspree.

## ⚙️ Configuration

The project is highly customizable through environment variables. Copy `.env.example` to `.env` and fill in your details:

### Identity & Bio
- `VITE_SITE_NAME`: The name shown in the browser tab.
- `VITE_OWNER_NAME`: Your full name.
- `VITE_OWNER_TITLE`: Your professional role.
- `VITE_OWNER_BIO`: A short introduction.
- `VITE_AVAILABILITY`: Your current status (e.g., "Available for work").

### Contact & Socials
- `VITE_EMAIL`: Your contact email.
- `VITE_FORMSPREE_ID`: Your Formspree endpoint ID for the contact form.
- `VITE_GITHUB_USERNAME`: Used for the GitHub service integration.
- `VITE_LINKEDIN_USERNAME`, `VITE_TWITTER_USERNAME`, `VITE_TIKTOK_USERNAME`: Social media profile links.

## 📂 Project Structure

```text
src/
├── components/     # UI components (Layout, Navbar, GridBackground, etc.)
├── data/           # Content data (about.js, projects.js)
├── hooks/          # Custom hooks (useScrollReveal)
├── pages/          # View components (Home, Projects, About, etc.)
├── services/       # GitHub API service
├── styles/         # Tailwind CSS & Global styles
└── App.jsx         # Main router and layout wrapper
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn / pnpm

### Installation

1. **Clone the repo:**
   ```bash
   git clone <repository-url>
   cd My_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your personal information
   ```

4. **Development:**
   ```bash
   npm run dev
   ```

5. **Production Build:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

The project is optimized for deployment on **Vercel**:
- Includes `vercel.json` for SPA routing support.
- Production-ready build optimizations via Vite.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

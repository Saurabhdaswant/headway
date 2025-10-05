# Habstrack - (Open Source)

A modern, open-source habit tracking application built with **Next.js** and **Tailwind CSS**, designed for clarity, motivation, and delightful user experience.

---

## 🚀 Quick Start

### Prerequisites

* **Node.js**: Version 22
* **Yarn**: Version 1.22 or higher (recommended)
* **Backend API**: Node/Express or hosted service (DigitalOcean App Platform)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Saurabhdaswant/habstrack.git
   cd habstrack
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   # Copy example env file
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```bash
   NEXT_PUBLIC_ISLOCAL=true
   NEXT_PUBLIC_API=http://localhost:5000/api
   ```

4. **Run the app**

   ```bash
   yarn dev
   ```

   Your app will be running at [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

### Core Framework

* **Next.js 13+** – React framework using the App Router
* **React 18+** – Component-based UI library
* **TypeScript (optional)** – Type-safe development

### UI & Styling

* **Tailwind CSS** – Utility-first CSS for clean, responsive UI
* **Framer Motion** – Smooth animations and transitions
* **Lucide React** – Beautiful open-source icons

### Data & API

* **REST API** – Built with Node.js & Express
* **Environment Variables** – Managed via `.env.local`


## 📁 Project Structure

```
HEADWAY/
├── components/          # Reusable UI components
├── Data/                # Local data and constants
├── hooks/               # Custom React hooks
├── Providers/           # Context providers (theme, auth, etc.)
├── pages/               # Page routes
├── public/              # Static assets
├── styles/              # Tailwind and global CSS
├── utils/               # Helper utilities and logic
├── .env.local.example   # Environment variable example
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

---

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Development / Production toggle
NEXT_PUBLIC_ISLOCAL=true

# API base URL
NEXT_PUBLIC_API=http://localhost:5000/api
```

Restart the dev server after making any `.env` changes:

```bash
yarn dev
```

---

## 📜 Available Scripts

```bash
yarn dev          # Start the Next.js development server
yarn build        # Build for production
yarn start        # Start the production server
yarn lint         # Run ESLint checks
yarn format       # Format code using Prettier
```

---

## 🎯 Design Philosophy

Habstrack is designed around three key principles:

* **Simplicity** — Minimal interface, maximum focus.
* **Consistency** — Encourages daily discipline and progress visualization.
* **Delight** — Subtle animations, soft colors, and a smooth UX.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `feature/your-feature-name`.
3. Commit your changes with clear messages.
4. Open a pull request for review.

## 📚 Documentation

### Core References

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://react.dev)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [Framer Motion Docs](https://www.framer.com/motion/)


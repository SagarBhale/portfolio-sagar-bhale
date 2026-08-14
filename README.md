# Frontend Developer Portfolio

A production-ready, responsive portfolio built with React, MUI, and Three.js.

## Tech Stack

- **React 18** (functional components only)
- **React Router DOM** – routing
- **Material UI (MUI) v5** – components and theme
- **Three.js** – lightweight 3D hero background
- **CSS Modules** – scoped styles, no inline CSS
- **Vite** – build and dev server
- **react-helmet-async** – SEO meta tags

## Features

- Smooth scrolling and scroll-spy navigation
- Dark / light theme with persistence
- Code splitting (React.lazy + Suspense)
- Reusable, accessible components
- Custom hooks (useForm, useScrollSpy, useThemeMode, etc.)
- Contact form with validation and Snackbar feedback
- Optional 3D tilt on project cards
- Resume download (replace `public/resume.pdf` with your PDF)

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Customization

Edit `src/data/portfolio.js` to update:

- Hero (name, title, tagline, resume URL)
- About (summary, highlights, interests)
- Skills (categories and items)
- Projects (title, description, image, tags, links)
- Experience (role, company, duration, achievements)
- Contact (email, social links)
- Nav sections

Replace `public/resume.pdf` with your own resume file.

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI (Button, Card, InputField, etc.)
│   ├── layout/       # Navbar, Footer
│   └── sections/     # Hero, About, Skills, Projects, Experience, Contact
├── context/          # ThemeModeContext
├── data/             # portfolio.js content
├── hooks/            # useScrollSpy, useForm, useThemeMode, etc.
├── theme/            # MUI theme + CSS variable injection
├── App.jsx
└── main.jsx
```

## Performance

- Lazy-loaded sections and Three.js scene
- Debounced scroll listener for scroll-spy
- React.memo on heavy list items and cards
- Manual chunks for `three` and `mui` in Vite config

## License

MIT

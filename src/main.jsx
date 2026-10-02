import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

const el = document.getElementById('root')
// Production HTML is prerendered (scripts/prerender.mjs) — hydrate it.
// In dev the root is empty — mount normally.
if (el.hasChildNodes()) hydrateRoot(el, <App />)
else createRoot(el).render(<App />)

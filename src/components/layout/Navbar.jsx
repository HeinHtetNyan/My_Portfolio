import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site } from '../../config'

const navLinks = [
  { label: 'projects', path: '/projects' },
  { label: 'about', path: '/about' },
  { label: 'notes', path: '/notes' },
  { label: 'contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-black/80 border-b border-neutral-900'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="section-padding flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-white font-black text-lg tracking-tight hover:opacity-70 transition-opacity"
          aria-label="Home"
        >
          {site.name}
        </Link>

        <ul className="flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 relative group ${
                    isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

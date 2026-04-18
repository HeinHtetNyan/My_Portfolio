import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { site } from '../config'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>{`404 — ${site.name}`}</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">404</p>
          <h1 className="heading-xl text-neutral-800 mb-6">Not found.</h1>
          <p className="text-neutral-600 mb-12 max-w-sm mx-auto">
            This page doesn't exist. You may have mistyped the URL.
          </p>
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-widest border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-200"
          >
            Go home
          </Link>
        </motion.div>
      </div>
    </>
  )
}

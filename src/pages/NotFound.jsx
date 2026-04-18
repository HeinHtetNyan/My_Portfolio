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

      <div className="min-h-screen section-padding flex flex-col justify-end pb-24 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-sm mb-10">404</p>

          <h1
            className="font-black text-neutral-900 mb-12"
            style={{ fontSize: 'clamp(80px, 14vw, 180px)', lineHeight: 0.9, letterSpacing: '-0.04em' }}
          >
            Not<br />Found
            <span className="text-black">.</span>
          </h1>

          <p className="text-neutral-700 text-base mb-12 max-w-xs leading-relaxed">
            This page doesn't exist. You may have mistyped the address.
          </p>

          <Link
            to="/"
            className="text-sm font-semibold text-white border-b border-white pb-0.5 hover:border-neutral-500 hover:text-neutral-400 transition-all duration-200"
          >
            Go home →
          </Link>
        </motion.div>
      </div>
    </>
  )
}

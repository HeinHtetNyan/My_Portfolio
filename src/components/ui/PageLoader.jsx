import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-neutral-600 text-sm font-medium tracking-widest uppercase"
      >
        loading
      </motion.div>
    </div>
  )
}

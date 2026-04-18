import { motion } from 'framer-motion'

export default function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="border border-neutral-900 p-8"
    >
      <div className="h-3 bg-neutral-900 rounded w-1/3 mb-4" />
      <div className="h-4 bg-neutral-900 rounded w-3/4 mb-3" />
      <div className="h-4 bg-neutral-900 rounded w-2/3 mb-6" />
      <div className="flex gap-3">
        <div className="h-3 bg-neutral-900 rounded w-16" />
        <div className="h-3 bg-neutral-900 rounded w-16" />
      </div>
    </motion.div>
  )
}

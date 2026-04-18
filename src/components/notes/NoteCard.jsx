import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function NoteCard({ note, index, reverse }) {
  const { ref, isVisible } = useScrollReveal()

  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group grid md:grid-cols-2 gap-0 border border-neutral-900 overflow-hidden card-hover ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className={`relative overflow-hidden aspect-video md:aspect-auto ${reverse ? 'md:order-2' : ''}`}>
        <img
          src={note.image}
          alt={note.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className={`p-8 md:p-12 flex flex-col justify-center gap-4 ${reverse ? 'md:order-1' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-600 uppercase tracking-widest">{note.tag}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-800" />
          <time className="text-xs text-neutral-600" dateTime={note.date}>{formattedDate}</time>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white">
          {note.title}
        </h3>

        <p className="text-neutral-500 text-sm leading-relaxed">
          {note.excerpt}
        </p>

        <button
          className="w-fit text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-medium flex items-center gap-2 mt-2 group/btn"
          aria-label={`Read ${note.title}`}
        >
          Read more
          <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
        </button>
      </div>
    </motion.article>
  )
}

import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function ProjectCard({ repo, index }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group border border-neutral-900 card-hover p-8 flex flex-col gap-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">
            {repo.language || 'Code'}
          </p>
          <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
            {repo.name}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-neutral-600 text-sm shrink-0">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          <span>{repo.stargazers_count}</span>
        </div>
      </div>

      <p className="text-neutral-500 text-sm leading-relaxed flex-1">
        {repo.description}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-neutral-900">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-medium flex items-center gap-1.5"
          aria-label={`View ${repo.name} on GitHub`}
        >
          GitHub
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-medium flex items-center gap-1.5"
            aria-label={`View live demo of ${repo.name}`}
          >
            Live Demo
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  )
}

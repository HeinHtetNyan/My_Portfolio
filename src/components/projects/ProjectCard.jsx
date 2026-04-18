import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'

/* Language → accent color map */
const LANG_COLORS = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Rust: '#CE422B',
  Go: '#00ADD8',
  CSS: '#663399',
  HTML: '#E34F26',
  default: '#555555',
}

function LangDot({ lang }) {
  const color = LANG_COLORS[lang] ?? LANG_COLORS.default
  return (
    <span
      className="w-2 h-2 rounded-full shrink-0 mt-1"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  )
}

export default function ProjectCard({ repo, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group grid md:grid-cols-[1fr_1fr] gap-0 py-12 md:py-16 border-b border-white/[0.06] last:border-0"
    >
      {/* ── LEFT: visual identity ── */}
      <div className="pr-0 md:pr-20 mb-8 md:mb-0 flex flex-col justify-between gap-8">

        {/* Meta */}
        <div className="flex items-center gap-5">
          {repo.language && (
            <span className="flex items-center gap-2">
              <LangDot lang={repo.language} />
              <span className="label-sm">{repo.language}</span>
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="label-sm flex items-center gap-1.5 ml-auto">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              {repo.stargazers_count}
            </span>
          )}
        </div>

        {/* Big repo name */}
        <h3
          className="text-neutral-700 group-hover:text-white transition-colors font-black tracking-tight break-words"
          style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
        >
          {repo.name}
        </h3>
      </div>

      {/* ── RIGHT: description + links ── */}
      <div className="flex flex-col justify-between gap-8">
        <p className="text-neutral-500 leading-relaxed text-base">
          {repo.description}
        </p>

        <div className="flex items-center gap-8">
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white border-b border-neutral-700 pb-0.5 hover:border-white transition-colors duration-200"
            aria-label={`View ${repo.name} on GitHub`}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            GitHub ↗
          </motion.a>
          {repo.homepage && (
            <motion.a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-neutral-500 border-b border-neutral-800 pb-0.5 hover:text-white hover:border-neutral-500 transition-colors duration-200"
              aria-label={`Live demo of ${repo.name}`}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              Live ↗
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

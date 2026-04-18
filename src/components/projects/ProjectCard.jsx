import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import { site } from '../../config'

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
      className="w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  )
}

export default function ProjectCard({ repo, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.06 })
  const previewImg = `https://opengraph.githubassets.com/1/${site.github.username}/${repo.name}`
  const year = new Date(repo.pushed_at || repo.updated_at).getFullYear()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 md:gap-12 border-b border-white/[0.06] last:border-0 py-8 md:py-10 items-start"
    >
      {/* ── LEFT: styled project card ── */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-sm"
        aria-label={`View ${repo.name} on GitHub`}
        style={{ backgroundColor: '#0e0e0e' }}
      >
        {/* Top info bar */}
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{ backgroundColor: '#141414' }}
        >
          <span className="label-sm tabular-nums">{year}</span>
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <LangDot lang={repo.language} />
                <span className="label-sm">{repo.language}</span>
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="label-sm flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                {repo.stargazers_count}
              </span>
            )}
          </div>
        </div>

        {/* Title + arrow */}
        <div className="flex items-end justify-between px-5 pt-6 pb-5">
          <h3
            className="text-white font-black tracking-tight break-words group-hover:opacity-80 transition-opacity duration-300"
            style={{ fontSize: 'clamp(26px, 3.5vw, 52px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          >
            {repo.name}
          </h3>
          <motion.span
            className="text-white text-xl shrink-0 ml-4 mb-0.5"
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.span>
        </div>

        {/* Image */}
        <div className="w-full overflow-hidden" style={{ backgroundColor: '#0e0e0e' }}>
          <motion.img
            src={previewImg}
            alt={repo.name}
            loading="lazy"
            className="w-full object-cover"
            style={{ aspectRatio: '16 / 9', display: 'block' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </a>

      {/* ── RIGHT: description ── */}
      <div className="pt-0 md:pt-10">
        {repo.description ? (
          <p className="text-neutral-600 text-sm leading-relaxed">{repo.description}</p>
        ) : (
          <p className="text-neutral-800 text-sm italic">No description.</p>
        )}
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-xs font-semibold text-neutral-600 border-b border-neutral-800 pb-0.5 hover:text-white hover:border-neutral-500 transition-colors duration-200"
          >
            Live demo ↗
          </a>
        )}
      </div>
    </motion.article>
  )
}

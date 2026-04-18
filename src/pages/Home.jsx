import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { fetchRepos } from '../services/github'
import { site } from '../config'

/* ─── Language → card theme ─── */
const LANG_THEME = {
  TypeScript:  { accent: '#080d1a', titleColor: '#60a5fa', barBg: '#0b1120' },
  JavaScript:  { accent: '#1a1600', titleColor: '#fbbf24', barBg: '#221c00' },
  Python:      { accent: '#0a1020', titleColor: '#818cf8', barBg: '#0d1428' },
  Go:          { accent: '#001a14', titleColor: '#34d399', barBg: '#00221a' },
  Rust:        { accent: '#1a0800', titleColor: '#fb923c', barBg: '#220e00' },
  default:     { accent: '#111111', titleColor: '#ffffff', barBg: '#1a1a1a' },
}

/* ─── Scroll-reveal wrapper ─── */
function Reveal({ children, className = '', delay = 0, y = 50 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Sticky layered project card ─── */
function ProjectCard({ repo, index }) {
  const theme = LANG_THEME[repo.language] ?? LANG_THEME.default
  const year = new Date(repo.pushed_at || repo.updated_at).getFullYear()
  const fallbackImg = `https://opengraph.githubassets.com/1/${site.github.username}/${repo.name}`
  const image = repo.openGraphImageUrl ?? fallbackImg

  return (
    <div style={{ position: 'sticky', top: '56px', zIndex: index + 1 }}>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`View ${repo.name} on GitHub`}
      >
        {/* Top info bar */}
        <div
          className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-3"
          style={{ backgroundColor: theme.barBg }}
        >
          <span className="label-sm tabular-nums">{year}</span>
          <span className="label-sm">{repo.language ?? 'Code'}</span>
        </div>

        {/* Title + arrow */}
        <div
          className="flex items-end justify-between px-6 md:px-12 lg:px-24 pt-10 pb-8"
          style={{ backgroundColor: theme.accent }}
        >
          <h3
            className="font-black tracking-tight transition-opacity duration-300 group-hover:opacity-80"
            style={{
              fontSize: 'clamp(48px, 8vw, 110px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: theme.titleColor,
            }}
          >
            {repo.name}
          </h3>
          <motion.span
            className="text-3xl md:text-4xl shrink-0 ml-6 mb-1"
            style={{ color: theme.titleColor }}
            whileHover={{ x: 4, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.span>
        </div>

        {/* Full-width image */}
        <div className="w-full overflow-hidden" style={{ backgroundColor: theme.accent }}>
          <motion.img
            src={image}
            alt={repo.name}
            loading="lazy"
            className="w-full object-cover"
            style={{ aspectRatio: '16 / 7', display: 'block' }}
            onError={(e) => { e.currentTarget.src = fallbackImg }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </a>
    </div>
  )
}

/* ─── Skeleton card ─── */
function SkeletonCard({ index }) {
  return (
    <div style={{ position: 'sticky', top: '56px', zIndex: index + 1 }}>
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        className="bg-neutral-950"
      >
        <div className="h-10 bg-neutral-900" />
        <div className="h-36 bg-neutral-950 px-6 md:px-12 lg:px-24 flex items-end pb-8">
          <div className="h-16 w-2/3 bg-neutral-900 rounded" />
        </div>
        <div className="w-full bg-neutral-900" style={{ aspectRatio: '16 / 7' }} />
      </motion.div>
    </div>
  )
}

/* ─── Page ─── */
export default function Home() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!site.github.username) { setLoading(false); return }
    fetchRepos(site.github.username)
      .then((data) => {
        const starred = data.filter((repo) => repo.stargazers_count > 0)
        setRepos(starred.length > 0 ? starred : data)
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false))
  }, [])

  const showcaseItems = repos

  return (
    <>
      <Helmet>
        <title>{`${site.name} — Portfolio`}</title>
        <meta name="description" content={site.seo.description} />
        <meta property="og:title" content={`${site.name} — Portfolio`} />
        <meta property="og:description" content={site.seo.description} />
        {site.seo.ogUrl && <meta property="og:url" content={site.seo.ogUrl} />}
      </Helmet>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="section-padding relative flex flex-col justify-end min-h-screen pb-20 pt-32">

        {site.owner.availability && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-20 right-6 md:right-12 lg:right-24 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="label-sm">{site.owner.availability}</span>
          </motion.div>
        )}

        <div className="overflow-hidden">
          <motion.h1
            className="heading-hero text-white"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {site.owner.title.split(' ')[0]}
            <br />
            <span className="text-neutral-800">
              {site.owner.title.split(' ').slice(1).join(' ')} &
            </span>
            <br />
            System Builder<span className="text-neutral-800">.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-12 md:mt-16"
        >
          <p className="text-neutral-500 text-base leading-relaxed max-w-xs">
            {site.owner.bio}
          </p>
          <div className="flex items-center gap-8">
            <Link
              to="/projects"
              className="text-sm font-semibold text-white border-b border-white pb-0.5 hover:border-neutral-600 hover:text-neutral-400 transition-all duration-200"
            >
              View work →
            </Link>
            <Link
              to="/contact"
              className="text-sm text-neutral-600 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 h-px bg-white/[0.06]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      {/* ══════════════════════════════════════════
          STACKED PROJECT SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="pt-20 pb-0">

        <Reveal className="section-padding flex items-center justify-between mb-10">
          <p className="label-sm">Selected work</p>
          <Link
            to="/projects"
            className="text-sm text-neutral-600 hover:text-white transition-colors"
          >
            All projects →
          </Link>
        </Reveal>

        <div>
          {loading
            ? [0, 1, 2, 3].map((i) => <SkeletonCard key={i} index={i} />)
            : showcaseItems.length > 0
              ? showcaseItems.map((repo, i) => (
                  <ProjectCard key={repo.id} repo={repo} index={i} />
                ))
              : (
                <div className="section-padding py-20 text-neutral-700 text-sm">
                  No public repositories found.
                </div>
              )
          }
        </div>
      </section>

      {/* Spacer so content below clears the sticky cards */}
      <div style={{ height: `${showcaseItems.length * 20}px` }} />

      {/* ══════════════════════════════════════════
          ABOUT PREVIEW
      ══════════════════════════════════════════ */}
      <section className="section-padding py-28 md:py-36 divider border-t relative z-10 bg-black">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          <Reveal>
            <p className="label-sm mb-8">About</p>
            <p className="text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight text-white mb-10">
              I design and build scalable backend systems that power real-world applications. Experienced in Python, FastAPI, PostgreSQL, and distributed system design.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-sm text-neutral-500 hover:text-white transition-colors"
            >
              <span>More about me</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-square overflow-hidden bg-neutral-950">
              <img
                src="/IMG_4558.JPG"
                alt={site.owner.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-white font-semibold">{site.owner.name}</p>
                <p className="text-neutral-500 text-sm mt-1">{site.owner.title}</p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="section-padding py-32 md:py-44 divider border-t relative z-10 bg-black">
        <Reveal>
          <p className="label-sm mb-10">Available for backend projects.</p>

          <h2 className="heading-hero text-white mb-12">
            Building scalable
            <br />
            <span className="text-neutral-800">APIs and systems</span>
            <br />
            for real-world products<span className="text-neutral-800">.</span>
          </h2>

          <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.25 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 text-lg font-semibold text-white group"
            >
              <span className="border-b-2 border-white pb-0.5 group-hover:border-neutral-600 transition-colors duration-300">
                Start a project
              </span>
              <span className="text-neutral-500 group-hover:text-white transition-colors">→</span>
            </Link>
          </motion.div>
        </Reveal>
      </section>

      <div className="relative z-10 bg-black">
        <Footer />
      </div>
    </>
  )
}

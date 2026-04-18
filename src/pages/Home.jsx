import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { featuredProjects } from '../data/projects'
import { site } from '../config'

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
function ProjectCard({ project, index }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: '56px',          /* navbar height */
        zIndex: index + 1,
      }}
    >
      <Link
        to={project.href}
        className="group block"
        aria-label={`View ${project.title}`}
      >
        {/* ── Top info bar ── */}
        <div
          className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-3"
          style={{ backgroundColor: project.barBg }}
        >
          <span className="label-sm tabular-nums">{project.year}</span>
          <span className="label-sm">{project.tag}</span>
        </div>

        {/* ── Title row on accent background ── */}
        <div
          className="flex items-end justify-between px-6 md:px-12 lg:px-24 pt-10 pb-8"
          style={{ backgroundColor: project.accent }}
        >
          <h3
            className="font-black tracking-tight transition-opacity duration-300 group-hover:opacity-80"
            style={{
              fontSize: 'clamp(48px, 8vw, 110px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: project.titleColor,
            }}
          >
            {project.title}
          </h3>

          <motion.span
            className="text-3xl md:text-4xl shrink-0 ml-6 mb-1"
            style={{ color: project.titleColor }}
            whileHover={{ x: 4, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.span>
        </div>

        {/* ── Full-width image ── */}
        <div
          className="w-full overflow-hidden"
          style={{ backgroundColor: project.accent }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full object-cover"
            style={{ aspectRatio: '16 / 7', display: 'block' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </Link>
    </div>
  )
}

/* ─── Page ─── */
export default function Home() {
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
            designer<span className="text-neutral-800">.</span>
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
          — no section-padding so images are full-width
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

        {/* Sticky stack */}
        <div>
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Spacer so content below clears the sticky cards */}
      <div style={{ height: `${featuredProjects.length * 20}px` }} />

      {/* ══════════════════════════════════════════
          ABOUT PREVIEW
      ══════════════════════════════════════════ */}
      <section className="section-padding py-28 md:py-36 divider border-t relative z-10 bg-black">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          <Reveal>
            <p className="label-sm mb-8">About</p>
            <p className="text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight text-white mb-10">
              {site.owner.bio}
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
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <span
                  className="font-black text-neutral-900"
                  style={{ fontSize: 'clamp(110px, 20vw, 260px)', lineHeight: 1 }}
                >
                  {site.name.replace(/\./g, '').slice(0, 1).toUpperCase()}
                </span>
              </div>
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
          <p className="label-sm mb-10">Let's work together</p>

          <h2 className="heading-hero text-white mb-12">
            i'm open for
            <br />
            <span className="text-neutral-800">freelance</span>
            <br />
            projects<span className="text-neutral-800">.</span>
          </h2>

          <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.25 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 text-lg font-semibold text-white group"
            >
              <span className="border-b-2 border-white pb-0.5 group-hover:border-neutral-600 transition-colors duration-300">
                Say hello
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

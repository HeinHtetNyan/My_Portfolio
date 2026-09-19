import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { showcaseProjects } from '../data/showcase'
import { site } from '../config'

/* Scroll-reveal wrapper */
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

/* Curated project card */
function ProjectCard({ project, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.06 })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-neutral-100 dark:bg-[#111111]"
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col flex-1"
        aria-label={`Open ${project.title}`}
      >
        {/* Preview image */}
        <div className={`overflow-hidden flex items-center justify-center bg-neutral-200 dark:bg-neutral-900 ${project.orientation === 'portrait' ? 'aspect-[16/9]' : ''}`}>
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={project.orientation === 'portrait' ? 'h-full w-auto object-cover' : 'w-full object-cover'}
            style={project.orientation === 'portrait' ? {} : { aspectRatio: '16 / 9', display: 'block' }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 gap-3 p-5">
          <h3 className="text-base font-bold leading-snug tracking-tight text-neutral-900 dark:text-white group-hover:opacity-75 transition-opacity duration-200">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {project.description}
          </p>

          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </motion.article>
  )
}

/* Page */
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
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-700 dark:text-neutral-300">
              {site.owner.availability}
            </span>
          </motion.div>
        )}

        <div className="overflow-hidden">
          <motion.h1
            className="heading-hero text-neutral-900 dark:text-white"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {site.owner.title.split(' ')[0]}
            <br />
            <span className="text-neutral-300 dark:text-neutral-800">
              {site.owner.title.split(' ').slice(1).join(' ')}
              <span className="text-neutral-300 dark:text-neutral-800">.</span>
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-12 md:mt-16"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed max-w-xs">
            {site.owner.bio}
          </p>
          <div className="flex items-center gap-8">
            <Link
              to="/projects"
              className="text-base font-semibold text-neutral-900 dark:text-white border-b border-neutral-900 dark:border-white pb-0.5 hover:border-neutral-400 hover:text-neutral-500 dark:hover:border-neutral-600 dark:hover:text-neutral-400 transition-all duration-200"
            >
              View work →
            </Link>
            <Link
              to="/contact"
              className="text-base text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
            <a
              href="/Hein_Htet_Nyan_Resume.pdf"
              download
              className="text-base text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Download CV
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 h-px bg-black/[0.08] dark:bg-white/[0.06]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      {/* ══════════════════════════════════════════
          PROJECT SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="pt-20 pb-16">

        <Reveal className="section-padding flex items-center justify-between mb-10">
          <p className="label-sm">Selected work</p>
          <Link
            to="/projects"
            className="text-base text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            All projects →
          </Link>
        </Reveal>

        <div className="section-padding grid grid-cols-1 sm:grid-cols-2 gap-5">
          {showcaseProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT PREVIEW
      ══════════════════════════════════════════ */}
      <section className="section-padding py-28 md:py-36 divider border-t relative z-10 bg-white dark:bg-black">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          <Reveal>
            <p className="label-sm mb-8">About</p>
            <p className="text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-white mb-10">
              I design and build complete production systems — from backend APIs to frontend interfaces and mobile apps. Experienced in Python, FastAPI, React, Flutter, and PostgreSQL.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-base text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
            <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-950">
              <img
                src="/IMG_4558.JPG"
                alt={site.owner.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-white font-semibold">{site.owner.name}</p>
                <p className="text-neutral-400 text-sm mt-1">{site.owner.title}</p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="section-padding py-32 md:py-44 divider border-t relative z-10 bg-white dark:bg-black">
        <Reveal>
          <p className="label-sm mb-10">Available for new projects.</p>

          <h2 className="heading-hero text-neutral-900 dark:text-white mb-12">
            Building complete
            <br />
            <span className="text-neutral-300 dark:text-neutral-800">products and systems</span>
            <br />
            for real-world use<span className="text-neutral-300 dark:text-neutral-800">.</span>
          </h2>

          <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.25 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 text-lg font-semibold text-neutral-900 dark:text-white group"
            >
              <span className="border-b-2 border-neutral-900 dark:border-white pb-0.5 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors duration-300">
                Start a project
              </span>
              <span className="text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">→</span>
            </Link>
          </motion.div>
        </Reveal>
      </section>

      <div className="relative z-10 bg-white dark:bg-black">
        <Footer />
      </div>
    </>
  )
}

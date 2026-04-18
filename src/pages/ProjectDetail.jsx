import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import { featuredProjects } from '../data/projects'
import { site } from '../config'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = featuredProjects.find((proj) => proj.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  const currentIndex = featuredProjects.indexOf(project)
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length]

  return (
    <>
      <Helmet>
        <title>{`${project.title} — ${site.name}`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} — ${site.name}`} />
      </Helmet>

      {/* ── Top info bar ── */}
      <div
        className="flex items-center justify-between section-padding py-3"
        style={{ backgroundColor: project.barBg }}
      >
        <span className="label-sm tabular-nums">{project.year}</span>
        <span className="label-sm">{project.tag}</span>
      </div>

      {/* ── Hero title ── */}
      <section
        className="section-padding pt-16 pb-12"
        style={{ backgroundColor: project.accent }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/projects"
            className="label-sm mb-10 inline-block hover:opacity-60 transition-opacity"
            style={{ color: project.titleColor }}
          >
            ← All projects
          </Link>
          <h1
            className="font-black tracking-tight"
            style={{
              fontSize: 'clamp(52px, 10vw, 130px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: project.titleColor,
            }}
          >
            {project.title}
          </h1>
        </motion.div>
      </section>

      {/* ── Full-width image ── */}
      <div style={{ backgroundColor: project.accent }}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full object-cover"
          style={{ aspectRatio: '16 / 7', display: 'block' }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Project details ── */}
      <section className="section-padding py-20 md:py-28 divider border-t">
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-16 md:gap-24">

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-sm mb-8">Overview</p>
            <p
              className="text-white font-light leading-relaxed"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
            >
              {project.longDescription}
            </p>

            {/* Links */}
            <div className="flex items-center gap-8 mt-12">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white border-b border-white pb-0.5 hover:border-neutral-500 hover:text-neutral-400 transition-all duration-200"
                >
                  Live demo ↗
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-500 border-b border-neutral-700 pb-0.5 hover:text-white hover:border-neutral-500 transition-all duration-200"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-sm mb-8">Tech stack</p>
            <ul className="flex flex-col gap-0">
              {project.tech.map((techItem, techIndex) => (
                <li
                  key={techItem}
                  className={`py-4 text-white font-semibold text-base ${
                    techIndex < project.tech.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  {techItem}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── Next project ── */}
      <section className="divider border-t">
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between section-padding py-10 md:py-14 hover:opacity-80 transition-opacity"
        >
          <div>
            <p className="label-sm mb-3">Next project</p>
            <p
              className="text-white font-black tracking-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em' }}
            >
              {nextProject.title}
            </p>
          </div>
          <motion.span
            className="text-white text-3xl shrink-0 ml-6"
            whileHover={{ x: 4, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.span>
        </Link>
      </section>

      <Footer />
    </>
  )
}

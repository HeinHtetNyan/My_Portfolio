import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { notes } from '../data/notes'
import { site } from '../config'

function RevealSection({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

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

      {/* Hero */}
      <section className="section-padding pt-40 pb-32 min-h-screen flex flex-col justify-center border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {site.owner.availability && (
            <p className="text-neutral-600 text-sm uppercase tracking-widest mb-8">
              {site.owner.availability}
            </p>
          )}
          <h1 className="heading-xl text-white mb-8 max-w-5xl">
            Software<br />
            <span className="text-neutral-700">engineer &</span><br />
            designer.
          </h1>
          <p className="text-neutral-500 text-lg max-w-md leading-relaxed mb-12">
            {site.owner.bio}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/projects"
              className="text-sm font-semibold uppercase tracking-widest border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-200"
            >
              View work
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-neutral-500 hover:text-white transition-colors"
            >
              Get in touch →
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-8 mt-24"
        >
          {['React', 'TypeScript', 'Node.js', 'Figma'].map((tech) => (
            <span key={tech} className="text-xs text-neutral-700 uppercase tracking-widest">
              {tech}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Projects Preview */}
      <section className="section-padding py-24 border-b border-neutral-900">
        <RevealSection className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Selected work</p>
            <h2 className="heading-lg text-white">Projects.</h2>
          </div>
          <Link
            to="/projects"
            className="text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider mb-2"
          >
            All projects →
          </Link>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-900">
          {[
            { name: 'project-alpha', desc: 'A high-performance web application built with modern tooling.', lang: 'TypeScript' },
            { name: 'project-beta', desc: 'Design system and component library for scalable UIs.', lang: 'React' },
            { name: 'project-gamma', desc: 'CLI tool that automates repetitive development workflows.', lang: 'Node.js' },
          ].map((project, i) => (
            <RevealSection
              key={project.name}
              delay={i * 0.1}
              className={`p-8 group hover:bg-white/[0.02] transition-colors border-b md:border-b-0 ${i < 2 ? 'md:border-r border-neutral-900' : ''} border-neutral-900 cursor-default`}
            >
              <p className="text-xs text-neutral-700 uppercase tracking-widest mb-3">{project.lang}</p>
              <h3 className="text-lg font-bold mb-3 group-hover:text-neutral-200 transition-colors">{project.name}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{project.desc}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding py-24 border-b border-neutral-900">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">About</p>
            <h2 className="heading-lg text-white mb-8">Crafting<br />with intent.</h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              {site.owner.bio}
            </p>
            <Link
              to="/about"
              className="text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider"
            >
              More about me →
            </Link>
          </RevealSection>

          <RevealSection delay={0.1} className="grid grid-cols-2 gap-0 border border-neutral-900">
            {['4+', '20+', '3', '∞'].map((stat, i) => (
              <div
                key={i}
                className={`p-8 ${i % 2 === 0 ? 'border-r border-neutral-900' : ''} ${i < 2 ? 'border-b border-neutral-900' : ''}`}
              >
                <p className="text-4xl font-black mb-2">{stat}</p>
                <p className="text-xs text-neutral-600 uppercase tracking-widest">
                  {['Years exp.', 'Projects', 'Products shipped', 'Curiosity'][i]}
                </p>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* Notes Preview */}
      <section className="section-padding py-24 border-b border-neutral-900">
        <RevealSection className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Thinking</p>
            <h2 className="heading-lg text-white">Notes.</h2>
          </div>
          <Link
            to="/notes"
            className="text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider mb-2"
          >
            All notes →
          </Link>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-900">
          {notes.slice(0, 2).map((note, i) => (
            <RevealSection
              key={note.id}
              delay={i * 0.1}
              className={`p-8 group hover:bg-white/[0.02] transition-colors cursor-default ${i === 0 ? 'md:border-r border-b md:border-b-0 border-neutral-900' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-neutral-600 uppercase tracking-widest">{note.tag}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <time className="text-xs text-neutral-600">
                  {new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </time>
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:text-neutral-200 transition-colors">
                {note.title}
              </h3>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-32 border-b border-neutral-900 text-center">
        <RevealSection>
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-8">Let's work together</p>
          <h2 className="heading-xl text-white mb-8">Ready to build<br />something great?</h2>
          <p className="text-neutral-500 mb-12 max-w-md mx-auto leading-relaxed">
            I'm open to select freelance projects and full-time opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-block text-sm font-semibold uppercase tracking-widest border border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-colors duration-200"
          >
            Say hello
          </Link>
        </RevealSection>
      </section>

      <Footer />
    </>
  )
}

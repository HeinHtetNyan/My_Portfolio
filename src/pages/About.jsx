import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { experience, tools } from '../data/about'
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

export default function About() {
  return (
    <>
      <Helmet>
        <title>{`About — ${site.name}`}</title>
        <meta name="description" content={site.seo.description} />
        <meta property="og:title" content={`About — ${site.name}`} />
      </Helmet>

      {/* Hero */}
      <section className="section-padding pt-32 pb-24 border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl"
        >
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-8">About</p>
          <h1 className="heading-xl text-white mb-0">
            Engineer.<br />
            <span className="text-neutral-700">Designer.</span><br />
            Builder.
          </h1>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="section-padding py-24 border-b border-neutral-900">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <RevealSection>
            <p className="text-2xl text-white leading-relaxed font-light mb-6">
              {site.owner.bio}
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="relative aspect-square bg-neutral-950 border border-neutral-900 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-800 text-9xl font-black select-none">
                {site.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white font-bold text-xl">{site.owner.name}</p>
                <p className="text-neutral-500 text-sm">{site.owner.title}</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding py-24 border-b border-neutral-900">
        <RevealSection className="mb-16">
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Career</p>
          <h2 className="heading-lg text-white">Experience.</h2>
        </RevealSection>

        <div className="flex flex-col border border-neutral-900">
          {experience.map((job, i) => (
            <RevealSection
              key={job.id}
              delay={i * 0.1}
              className={`p-8 md:p-12 grid md:grid-cols-3 gap-6 group hover:bg-white/[0.02] transition-colors ${
                i < experience.length - 1 ? 'border-b border-neutral-900' : ''
              }`}
            >
              <div>
                <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">{job.period}</p>
                <p className="text-white font-bold text-lg">{job.role}</p>
                <p className="text-neutral-500 text-sm">{job.company}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-neutral-400 leading-relaxed">{job.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="section-padding py-24 border-b border-neutral-900">
        <RevealSection className="mb-16">
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Stack</p>
          <h2 className="heading-lg text-white">Tools & tech.</h2>
        </RevealSection>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-neutral-900">
          {tools.map((tool, i) => (
            <RevealSection
              key={tool}
              delay={i * 0.04}
              className={[
                'p-6 group hover:bg-white/[0.03] transition-colors',
                i % 4 !== 3 ? 'border-r border-neutral-900' : '',
                i < tools.length - 4 ? 'border-b border-neutral-900' : '',
                i % 2 !== 1 ? 'md:border-r-0' : '',
              ].join(' ')}
            >
              <p className="text-white font-semibold group-hover:text-neutral-200 transition-colors">
                {tool}
              </p>
            </RevealSection>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { experience, tools } from '../data/about'
import { site } from '../config'

function Reveal({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
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

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="section-padding pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-sm mb-10">About me</p>
          <h1 className="heading-hero text-white">
            Engineer
            <span className="text-neutral-800">.</span>
            <br />
            <span className="text-neutral-800">Designer.</span>
            <br />
            Builder
            <span className="text-neutral-800">.</span>
          </h1>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO + IMAGE
      ══════════════════════════════════════════ */}
      <section className="section-padding py-24 md:py-32 divider border-t">
        <div className="grid md:grid-cols-2 gap-16 md:gap-28 items-start">

          <Reveal>
            <p
              className="text-white font-light leading-[1.25] mb-10 tracking-tight"
              style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}
            >
              {site.owner.bio}
            </p>
            <p className="text-neutral-500 leading-relaxed text-base">
              With years of experience building products that scale, I've developed a methodical approach
              to solving complex problems without sacrificing elegance or craft.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative aspect-square overflow-hidden bg-neutral-950">
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <span
                  className="font-black text-neutral-900"
                  style={{ fontSize: 'clamp(120px, 20vw, 280px)', lineHeight: 1 }}
                >
                  {site.name.replace(/\./g, '').slice(0, 1).toUpperCase()}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                <p className="text-white font-semibold text-lg">{site.owner.name}</p>
                <p className="text-neutral-500 text-sm mt-1">{site.owner.title}</p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERIENCE TIMELINE
      ══════════════════════════════════════════ */}
      <section className="section-padding py-24 md:py-32 divider border-t">
        <Reveal className="mb-16 md:mb-20">
          <p className="label-sm mb-8">Career</p>
          <h2 className="heading-xl text-white">
            Experience<span className="text-neutral-800">.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {experience.map((job, i) => (
            <Reveal
              key={job.id}
              delay={i * 0.09}
              className={`grid md:grid-cols-[280px_1fr] gap-6 md:gap-16 py-10 md:py-12 ${
                i < experience.length - 1 ? 'border-b border-white/[0.06]' : ''
              }`}
            >
              <div>
                <p className="label-sm mb-4">{job.period}</p>
                <p className="text-white font-semibold text-lg leading-snug">{job.role}</p>
                <p className="text-neutral-600 text-sm mt-1.5">{job.company}</p>
              </div>
              <div className="flex items-center">
                <p className="text-neutral-400 leading-relaxed">{job.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TOOLS / STACK
      ══════════════════════════════════════════ */}
      <section className="section-padding py-24 md:py-32 divider border-t">
        <Reveal className="mb-16 md:mb-20">
          <p className="label-sm mb-8">Stack</p>
          <h2 className="heading-xl text-white">
            Tools<span className="text-neutral-800">.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                whileHover={{ color: '#ffffff' }}
                className="text-neutral-700 font-bold cursor-default transition-colors duration-200"
                style={{ fontSize: 'clamp(22px, 3vw, 36px)', letterSpacing: '-0.02em' }}
              >
                {tool}
                {i < tools.length - 1 && (
                  <span className="text-neutral-900 font-thin mx-2 text-xl">/</span>
                )}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  )
}

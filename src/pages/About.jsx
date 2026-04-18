import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import { stats, bio, experience, tools } from '../data/about'
import { site } from '../config'

function Reveal({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.06 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
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
      <section className="section-padding pt-32 pb-20">
        <motion.p
          className="label-sm mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          about
        </motion.p>
        <motion.h1
          className="text-white font-black leading-[1] tracking-tight"
          style={{ fontSize: 'clamp(42px, 7vw, 100px)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {site.owner.tagline}
        </motion.h1>
      </section>

      {/* ══════════════════════════════════════════
          STATS + PHOTO + BIO
      ══════════════════════════════════════════ */}
      <section className="section-padding pb-0 divider border-t">

        {/* Stats row */}
        <div className="grid grid-cols-3 border-b border-white/[0.06] py-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="label-sm mb-3">{stat.label}</p>
              <p className="text-white font-semibold text-lg md:text-xl">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Photo + Bio */}
        <div className="grid md:grid-cols-2 gap-0 items-stretch">

          {/* Photo */}
          <Reveal className="border-r border-white/[0.06] py-16 pr-0 md:pr-16">
            <div className="relative w-full overflow-hidden bg-neutral-950" style={{ aspectRatio: '3 / 4' }}>
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <span
                  className="font-black text-neutral-900"
                  style={{ fontSize: 'clamp(120px, 22vw, 300px)', lineHeight: 1 }}
                >
                  {site.name.replace(/\./g, '').slice(0, 1).toUpperCase()}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                <p className="text-white font-semibold">{site.owner.name}</p>
                <p className="text-neutral-500 text-sm mt-1">{site.owner.title}</p>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.12} className="py-16 pl-0 md:pl-16 flex items-center">
            <p
              className="text-white font-light leading-[1.3] tracking-tight"
              style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
            >
              {bio}
            </p>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          WORK EXPERIENCE
      ══════════════════════════════════════════ */}
      <section className="section-padding py-0 divider border-t">

        <div className="py-8 border-b border-white/[0.06]">
          <p className="label-sm" style={{ fontFamily: 'monospace' }}>.work experience</p>
        </div>

        <div>
          {experience.map((job, i) => (
            <Reveal
              key={job.id}
              delay={i * 0.07}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1.4fr] gap-6 md:gap-10 py-14 md:py-20 border-b border-white/[0.06] last:border-0 items-start"
            >
              {/* Period */}
              <p
                className="text-white font-black tracking-tight"
                style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', letterSpacing: '-0.02em' }}
              >
                {job.period}
              </p>

              {/* Company + Role */}
              <div>
                <p
                  className="text-white font-black tracking-tight leading-tight"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', letterSpacing: '-0.02em' }}
                >
                  {job.company}
                </p>
                <p className="text-neutral-600 text-sm mt-2">{job.role}</p>
              </div>

              {/* Description */}
              <p className="text-neutral-500 text-sm leading-relaxed md:pt-1">
                {job.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STACK
      ══════════════════════════════════════════ */}
      <section className="section-padding py-0 divider border-t">

        <div className="py-8 border-b border-white/[0.06]">
          <p className="label-sm" style={{ fontFamily: 'monospace' }}>.stack</p>
        </div>

        <Reveal className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="border-b border-r border-white/[0.06] p-8 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded bg-neutral-950 flex items-center justify-center p-2.5">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-base">{tool.name}</p>
                  <p className="label-sm mt-1" style={{ fontFamily: 'monospace' }}>{tool.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="section-padding py-28 md:py-40 divider border-t">
        <Reveal>
          <h2
            className="text-white font-black leading-[1.05] tracking-tight mb-16 max-w-4xl"
            style={{ fontSize: 'clamp(36px, 6vw, 86px)', letterSpacing: '-0.03em' }}
          >
            i'm open for freelance projects, feel free to email me to see how can we collaborate
          </h2>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            contact me ↗
          </Link>
        </Reveal>
      </section>

      <Footer />
    </>
  )
}

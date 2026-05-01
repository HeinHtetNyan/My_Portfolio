import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import ContactForm from '../components/contact/ContactForm'
import { site, socialLinks } from '../config'

const SOCIAL_ICONS = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
}

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>{`Contact — ${site.name}`}</title>
        <meta name="description" content="Get in touch. Open to freelance and full-time opportunities." />
        <meta property="og:title" content={`Contact — ${site.name}`} />
      </Helmet>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="section-padding pt-32 pb-20">
        <motion.h1
          className="text-neutral-900 dark:text-white font-black leading-none tracking-tight mb-16"
          style={{ fontSize: 'clamp(52px, 9vw, 120px)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Say Hello
        </motion.h1>

        <motion.p
          className="text-neutral-900 dark:text-white font-black leading-[1.05] tracking-tight max-w-4xl"
          style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Have a project in mind or need a backend system?
          <span className="text-neutral-400 dark:text-neutral-600"> Let's discuss your project.</span>
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════
          FORM + SOCIALS
      ══════════════════════════════════════════ */}
      <section className="section-padding pb-28 divider border-t">
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-16 md:gap-24 pt-16">

          {/* LEFT — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactForm />
          </motion.div>

          {/* RIGHT — social icon list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 pt-0 md:pt-1"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-4 hover:opacity-70 transition-opacity duration-200"
                aria-label={`${link.label}: ${link.handle}`}
              >
                {/* Icon box */}
                <div className="w-12 h-12 shrink-0 border border-black/20 dark:border-white/20 flex items-center justify-center text-neutral-900 dark:text-white group-hover:border-black/50 dark:group-hover:border-white/50 transition-colors duration-200">
                  {SOCIAL_ICONS[link.label] ?? (
                    <span className="text-sm font-bold">{link.label.slice(0, 2)}</span>
                  )}
                </div>

                {/* Label + handle */}
                <div>
                  <p className="text-neutral-900 dark:text-white text-base font-semibold lowercase">{link.label}</p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-0.5" style={{ fontFamily: 'monospace' }}>
                    {link.handle}
                  </p>
                </div>
              </a>
            ))}

          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  )
}

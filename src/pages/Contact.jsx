import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import ContactForm from '../components/contact/ContactForm'
import useScrollReveal from '../hooks/useScrollReveal'
import { site, socialLinks } from '../config'

export default function Contact() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 })

  return (
    <>
      <Helmet>
        <title>{`Contact — ${site.name}`}</title>
        <meta name="description" content="Get in touch. Open to freelance and full-time opportunities." />
        <meta property="og:title" content={`Contact — ${site.name}`} />
      </Helmet>

      {/* ── Page header ── */}
      <section className="section-padding pt-36 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-sm mb-10">Get in touch</p>
          <h1 className="heading-hero text-white">
            Say hello
            <span className="text-neutral-800">.</span>
          </h1>
        </motion.div>
      </section>

      {/* ── Two-column body ── */}
      <section className="section-padding pb-20 divider border-t">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 pt-16 md:pt-20">

          {/* LEFT — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-sm mb-12">Send a message</p>
            <ContactForm />
          </motion.div>

          {/* RIGHT — social */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-sm mb-12">Find me online</p>

            <ul className="flex flex-col">
              {socialLinks.map((link, i) => (
                <li
                  key={link.label}
                  className={i < socialLinks.length - 1 ? 'border-b border-white/[0.06]' : ''}
                >
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center justify-between py-6"
                    aria-label={`${link.label}: ${link.handle}`}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div>
                      <p className="label-sm mb-1.5">{link.label}</p>
                      <p className="text-neutral-500 group-hover:text-white transition-colors duration-300 text-base font-medium">
                        {link.handle}
                      </p>
                    </div>
                    <span className="text-neutral-800 group-hover:text-white transition-colors duration-300 text-xl">
                      ↗
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Response time note */}
            <div className="mt-14 pt-10 border-t border-white/[0.06]">
              <p className="label-sm mb-3">Response time</p>
              <p className="text-white font-semibold text-xl">Within 24 hours.</p>
              {site.contact.email && (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-neutral-600 text-sm hover:text-white transition-colors mt-2 inline-block"
                >
                  {site.contact.email}
                </a>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  )
}

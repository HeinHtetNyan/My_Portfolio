import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import ContactForm from '../components/contact/ContactForm'
import useScrollReveal from '../hooks/useScrollReveal'
import { site, socialLinks } from '../config'

export default function Contact() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>{`Contact — ${site.name}`}</title>
        <meta name="description" content="Get in touch. I'm open to freelance projects and full-time opportunities." />
        <meta property="og:title" content={`Contact — ${site.name}`} />
      </Helmet>

      <section className="section-padding pt-32 pb-8 border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">Contact</p>
          <h1 className="heading-xl text-white mb-6">Say hello.</h1>
          <p className="text-neutral-500 max-w-lg leading-relaxed">
            I'm open to select freelance projects and full-time opportunities. If you have something in mind, let's talk.
          </p>
        </motion.div>
      </section>

      <section className="section-padding py-16">
        <div className="grid md:grid-cols-2 gap-0 border border-neutral-900">
          <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-neutral-900">
            <h2 className="text-xl font-bold mb-8">Send a message</h2>
            <ContactForm />
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-10 md:p-16"
          >
            <h2 className="text-xl font-bold mb-8">Find me online</h2>
            <ul className="flex flex-col gap-0 border border-neutral-900">
              {socialLinks.map((link, i) => (
                <li
                  key={link.label}
                  className={i < socialLinks.length - 1 ? 'border-b border-neutral-900' : ''}
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-center justify-between p-5 group hover:bg-white/[0.03] transition-colors"
                    aria-label={`${link.label}: ${link.handle}`}
                  >
                    <div>
                      <p className="text-xs text-neutral-600 uppercase tracking-widest mb-1">{link.label}</p>
                      <p className="text-white text-sm font-medium">{link.handle}</p>
                    </div>
                    <span className="text-neutral-700 group-hover:text-white transition-colors group-hover:translate-x-1 inline-block transition-transform duration-200">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-6 border border-neutral-900 bg-neutral-950">
              <p className="text-xs text-neutral-600 uppercase tracking-widest mb-2">Response time</p>
              <p className="text-white font-semibold">Usually within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import NoteCard from '../components/notes/NoteCard'
import Footer from '../components/layout/Footer'
import { notes } from '../data/notes'
import { site } from '../config'

export default function Notes() {
  return (
    <>
      <Helmet>
        <title>{`Notes — ${site.name}`}</title>
        <meta name="description" content="Thoughts on engineering, design, and the craft of building things." />
        <meta property="og:title" content={`Notes — ${site.name}`} />
      </Helmet>

      <div className="section-padding pt-32 pb-8 border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">Writing</p>
          <h1 className="heading-xl text-white mb-6">Notes.</h1>
          <p className="text-neutral-500 max-w-lg leading-relaxed">
            Thinking out loud on engineering, design, and making things that matter.
          </p>
        </motion.div>
      </div>

      <section className="section-padding py-16">
        <div className="flex flex-col gap-0 border border-neutral-900">
          {notes.map((note, i) => (
            <div key={note.id} className={i < notes.length - 1 ? 'border-b border-neutral-900' : ''}>
              <NoteCard note={note} index={i} reverse={i % 2 !== 0} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

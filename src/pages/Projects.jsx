import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ProjectCard from '../components/projects/ProjectCard'
import Footer from '../components/layout/Footer'
import { fetchRepos, RateLimitError } from '../services/github'
import { site } from '../config'

const USERNAME = site.github.username

/* ─── Skeleton row matching ProjectCard layout ─── */
function SkeletonRow({ index }) {
  return (
    <motion.div
      animate={{ opacity: [0.25, 0.5, 0.25] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
      className="grid md:grid-cols-[1fr_1fr] gap-0 py-12 md:py-16 border-b border-white/[0.06]"
    >
      <div className="pr-0 md:pr-20 flex flex-col justify-between gap-10">
        <div className="h-2 bg-neutral-900 rounded w-28" />
        <div className="h-12 bg-neutral-900 rounded w-3/4" />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="h-2 bg-neutral-900 rounded w-full" />
          <div className="h-2 bg-neutral-900 rounded w-5/6" />
          <div className="h-2 bg-neutral-900 rounded w-3/4" />
        </div>
        <div className="h-2 bg-neutral-900 rounded w-20" />
      </div>
    </motion.div>
  )
}

/* ─── Status states ─── */
function StateMessage({ heading, body }) {
  return (
    <div className="py-40 flex flex-col items-center text-center gap-4">
      <p className="text-neutral-400 text-2xl font-semibold">{heading}</p>
      {body && <p className="text-neutral-700 text-sm max-w-sm leading-relaxed">{body}</p>}
    </div>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!USERNAME || USERNAME === 'yourusername') {
      setStatus('no-username')
      return
    }
    fetchRepos(USERNAME)
      .then((data) => { setRepos(data); setStatus('success') })
      .catch((err) => {
        setError(err.message)
        setStatus(err instanceof RateLimitError ? 'rate-limit' : 'error')
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>{`Projects — ${site.name}`}</title>
        <meta name="description" content="Open-source work and experiments. Built to learn, shipped to share." />
        <meta property="og:title" content={`Projects — ${site.name}`} />
      </Helmet>

      {/* ── Page header ── */}
      <section className="section-padding pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-sm mb-10">Open source — GitHub</p>
          <h1 className="heading-hero text-white">
            Projects
            <span className="text-neutral-800">.</span>
          </h1>
        </motion.div>
      </section>

      {/* ── Project list ── */}
      <section className="section-padding pb-20">
        <div className="border-t border-white/[0.06]">

          {status === 'loading' && (
            <div>
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonRow key={index} index={index} />
              ))}
            </div>
          )}

          {status === 'no-username' && (
            <StateMessage
              heading="GitHub username not set."
              body="Add VITE_GITHUB_USERNAME to your .env file to display repositories here."
            />
          )}

          {(status === 'error' || status === 'rate-limit') && (
            <StateMessage
              heading={status === 'rate-limit' ? 'Rate limit reached.' : 'Failed to load.'}
              body={error}
            />
          )}

          {status === 'success' && repos.length === 0 && (
            <StateMessage
              heading="No projects found."
              body="Public repos with descriptions and no forks are displayed here."
            />
          )}

          {status === 'success' && repos.length > 0 && (
            <div>
              {repos.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  )
}

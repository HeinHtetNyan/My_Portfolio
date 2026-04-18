import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ProjectCard from '../components/projects/ProjectCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import Footer from '../components/layout/Footer'
import { fetchRepos, RateLimitError } from '../services/github'
import { site } from '../config'

const USERNAME = site.github.username

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
      .then((data) => {
        setRepos(data)
        setStatus('success')
      })
      .catch((err) => {
        setError(err.message)
        setStatus(err instanceof RateLimitError ? 'rate-limit' : 'error')
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>{`Projects — ${site.name}`}</title>
        <meta name="description" content="A curated collection of my software projects and experiments." />
        <meta property="og:title" content={`Projects — ${site.name}`} />
      </Helmet>

      <div className="section-padding pt-32 pb-8 border-b border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">GitHub</p>
          <h1 className="heading-xl text-white mb-6">Projects.</h1>
          <p className="text-neutral-500 max-w-lg leading-relaxed">
            Open-source work and experiments. Built to learn, shipped to share.
          </p>
        </motion.div>
      </div>

      <section className="section-padding py-16">
        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-neutral-900">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`${i % 3 !== 2 ? 'md:border-r' : ''} ${i < 3 ? 'border-b' : ''} border-neutral-900`}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        )}

        {status === 'no-username' && (
          <div className="border border-neutral-900 p-16 text-center">
            <p className="text-neutral-400 text-lg font-semibold mb-2">GitHub username not set.</p>
            <p className="text-neutral-600 text-sm">
              Add <code className="text-neutral-400">VITE_GITHUB_USERNAME</code> to your <code className="text-neutral-400">.env</code> file.
            </p>
          </div>
        )}

        {(status === 'error' || status === 'rate-limit') && (
          <div className="border border-neutral-900 p-16 text-center">
            <p className="text-neutral-400 text-lg font-semibold mb-2">
              {status === 'rate-limit' ? 'Rate limit reached.' : 'Failed to load projects.'}
            </p>
            <p className="text-neutral-600 text-sm max-w-md mx-auto">{error}</p>
          </div>
        )}

        {status === 'success' && repos.length === 0 && (
          <div className="border border-neutral-900 p-16 text-center">
            <p className="text-neutral-400 text-lg font-semibold mb-2">No projects found.</p>
            <p className="text-neutral-600 text-sm">
              Public repos without forks or empty descriptions are shown here.
            </p>
          </div>
        )}

        {status === 'success' && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-neutral-900">
            {repos.map((repo, i) => (
              <div
                key={repo.id}
                className={[
                  i % 3 !== 2 ? 'lg:border-r border-neutral-900' : '',
                  i % 2 !== 1 ? 'md:border-r border-neutral-900 lg:border-r-0' : '',
                  Math.floor(i / 3) < Math.floor((repos.length - 1) / 3) ? 'lg:border-b border-neutral-900' : '',
                  Math.floor(i / 2) < Math.floor((repos.length - 1) / 2) ? 'md:border-b border-neutral-900 lg:border-b-0' : '',
                  'border-b border-neutral-900 last:border-b-0',
                ].join(' ')}
              >
                <ProjectCard repo={repo} index={i} />
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}

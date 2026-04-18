const BASE = 'https://api.github.com'

export async function fetchRepos(username) {
  const res = await fetch(`${BASE}/users/${username}/repos?per_page=100&sort=updated`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })

  if (res.status === 403) {
    const reset = res.headers.get('X-RateLimit-Reset')
    const resetTime = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : 'soon'
    throw new RateLimitError(`GitHub API rate limit exceeded. Resets at ${resetTime}.`)
  }

  if (res.status === 404) {
    throw new Error(`GitHub user "${username}" not found.`)
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  const repos = await res.json()

  return repos
    .filter((r) => !r.fork && r.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export class RateLimitError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RateLimitError'
  }
}

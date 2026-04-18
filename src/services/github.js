const GITHUB_API_BASE_URL = 'https://api.github.com'

export async function fetchRepos(username) {
  const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })

  if (response.status === 403) {
    const reset = response.headers.get('X-RateLimit-Reset')
    const resetTime = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : 'soon'
    throw new RateLimitError(`GitHub API rate limit exceeded. Resets at ${resetTime}.`)
  }

  if (response.status === 404) {
    throw new Error(`GitHub user "${username}" not found.`)
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  const repos = await response.json()

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
}

export class RateLimitError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RateLimitError'
  }
}

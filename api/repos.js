const GQL_QUERY = (username) => `{
  user(login: "${username}") {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
        name
        description
        url
        homepageUrl
        pushedAt
        updatedAt
        stargazerCount
        primaryLanguage { name }
        openGraphImageUrl
        usesCustomOpenGraphImage
      }
    }
  }
}`

export default async function handler(req, res) {
  const username = process.env.GITHUB_USERNAME
  const token = process.env.GITHUB_TOKEN

  if (!username) {
    return res.status(400).json({ error: 'GITHUB_USERNAME not configured.' })
  }

  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN not configured.' })
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: GQL_QUERY(username) }),
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: `GitHub API error: ${response.status}` })
    }

    const { data, errors } = await response.json()
    if (errors) return res.status(400).json({ error: errors[0].message })

    const repos = data.user.repositories.nodes.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      pushed_at: repo.pushedAt,
      updated_at: repo.updatedAt,
      stargazers_count: repo.stargazerCount,
      language: repo.primaryLanguage?.name ?? null,
      fork: false,
      openGraphImageUrl: repo.openGraphImageUrl,
      usesCustomOpenGraphImage: repo.usesCustomOpenGraphImage,
    }))

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(repos)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

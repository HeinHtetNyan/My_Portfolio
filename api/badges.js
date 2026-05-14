export default async function handler(req, res) {
  const username = process.env.CREDLY_USERNAME

  if (!username) {
    return res.status(400).json({ error: 'CREDLY_USERNAME not configured.' })
  }

  try {
    const response = await fetch(`https://www.credly.com/users/${username}/badges.json`)

    if (!response.ok) {
      return res.status(response.status).json({ error: `Credly API error: ${response.status}` })
    }

    const data = await response.json()

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

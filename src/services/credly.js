const ISSUER_CONFIG = {
  Google:   { accent: '#4285F4' },
  Meta:     { accent: '#0668E1' },
  IBM:      { accent: '#1F70C1' },
  Coursera: { accent: '#0056D2' },
}

function getIssuerName(issuer) {
  const entities = issuer?.entities ?? []
  // Prefer "Authorized by" (the actual certifying org — IBM, Meta, etc.)
  const authorizer = entities.find((e) => e.label === 'Authorized by')
  if (authorizer) return authorizer.entity.name
  // Fall back to primary / first entity
  const primary = entities.find((e) => e.primary) ?? entities[0]
  return primary?.entity?.name ?? 'Coursera'
}

function parseGroup(issuerName, badgeName) {
  if (badgeName.startsWith('Google')) return 'Google'
  return issuerName || 'Coursera'
}

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export async function fetchCredlyBadges() {
  const res = await fetch('/api/badges')
  if (!res.ok) throw new Error(`Credly proxy error: ${res.status}`)
  const json = await res.json()
  return json.data ?? []
}

export function groupBadges(badges) {
  const map = new Map()

  for (const badge of badges) {
    const template   = badge.badge_template ?? {}
    const issuerName = getIssuerName(template.issuer)
    const name       = template.name ?? 'Unknown'
    const group      = parseGroup(issuerName, name)

    if (!map.has(group)) map.set(group, [])
    map.get(group).push({
      id:     badge.id,
      name,
      issuer: issuerName,
      issued: formatDate(badge.issued_at) ?? '—',
      expiry: formatDate(badge.expires_at) ?? 'No expiry',
      image:  template.image_url ?? template.image?.url ?? '',
      url:    `https://www.credly.com/badges/${badge.id}`,
    })
  }

  return Array.from(map.entries()).map(([label, certs]) => ({
    id:     label.toLowerCase(),
    label,
    accent: ISSUER_CONFIG[label]?.accent ?? '#6b7280',
    certs,
  }))
}

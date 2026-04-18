const e = import.meta.env

export const site = {
  name: e.VITE_SITE_NAME ?? '.nitro',
  owner: {
    name: e.VITE_OWNER_NAME ?? 'Your Name',
    title: e.VITE_OWNER_TITLE ?? 'Software Engineer',
    tagline: e.VITE_OWNER_TAGLINE ?? 'Building digital experiences with precision and purpose.',
    bio: e.VITE_OWNER_BIO ?? 'I build precise, high-performance digital products.',
    availability: e.VITE_AVAILABILITY ?? '',
  },
  contact: {
    email: e.VITE_EMAIL ?? 'hello@yourdomain.com',
    formspreeEndpoint: `https://formspree.io/f/${e.VITE_FORMSPREE_ID ?? 'your-form-id'}`,
  },
  social: {
    github: e.VITE_GITHUB_USERNAME
      ? `https://github.com/${e.VITE_GITHUB_USERNAME}`
      : null,
    twitter: e.VITE_TWITTER_USERNAME
      ? `https://twitter.com/${e.VITE_TWITTER_USERNAME}`
      : null,
    linkedin: e.VITE_LINKEDIN_USERNAME
      ? `https://linkedin.com/in/${e.VITE_LINKEDIN_USERNAME}`
      : null,
    tiktok: e.VITE_TIKTOK_USERNAME
      ? `https://tiktok.com/@${e.VITE_TIKTOK_USERNAME}`
      : null,
  },
  seo: {
    description: e.VITE_META_DESCRIPTION ?? 'Software engineer building modern digital experiences.',
    ogUrl: e.VITE_OG_URL ?? '',
  },
  github: {
    username: e.VITE_GITHUB_USERNAME ?? '',
  },
}

export const socialLinks = [
  site.social.github && {
    label: 'GitHub',
    href: site.social.github,
    handle: `@${e.VITE_GITHUB_USERNAME}`,
  },
  site.social.twitter && {
    label: 'Twitter',
    href: site.social.twitter,
    handle: `@${e.VITE_TWITTER_USERNAME}`,
  },
  site.social.linkedin && {
    label: 'LinkedIn',
    href: site.social.linkedin,
    handle: `in/${e.VITE_LINKEDIN_USERNAME}`,
  },
  site.social.tiktok && {
    label: 'TikTok',
    href: site.social.tiktok,
    handle: `@${e.VITE_TIKTOK_USERNAME}`,
  },
  site.contact.email && {
    label: 'Email',
    href: `mailto:${site.contact.email}`,
    handle: site.contact.email,
  },
].filter(Boolean)

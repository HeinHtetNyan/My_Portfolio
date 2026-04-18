const env = import.meta.env

export const site = {
  name: env.VITE_SITE_NAME ?? '.nitro',
  owner: {
    name: env.VITE_OWNER_NAME ?? 'Your Name',
    title: env.VITE_OWNER_TITLE ?? 'Software Engineer',
    tagline: env.VITE_OWNER_TAGLINE ?? 'Building digital experiences with precision and purpose.',
    bio: env.VITE_OWNER_BIO ?? 'I build precise, high-performance digital products.',
    availability: env.VITE_AVAILABILITY ?? '',
  },
  contact: {
    email: env.VITE_EMAIL ?? 'hello@yourdomain.com',
    formspreeEndpoint: `https://formspree.io/f/${env.VITE_FORMSPREE_ID ?? 'your-form-id'}`,
  },
  social: {
    github: env.VITE_GITHUB_USERNAME
      ? `https://github.com/${env.VITE_GITHUB_USERNAME}`
      : null,
    twitter: env.VITE_TWITTER_USERNAME
      ? `https://twitter.com/${env.VITE_TWITTER_USERNAME}`
      : null,
    linkedin: env.VITE_LINKEDIN_USERNAME
      ? `https://linkedin.com/in/${env.VITE_LINKEDIN_USERNAME}`
      : null,
    tiktok: env.VITE_TIKTOK_USERNAME
      ? `https://tiktok.com/@${env.VITE_TIKTOK_USERNAME}`
      : null,
  },
  seo: {
    description: env.VITE_META_DESCRIPTION ?? 'Software engineer building modern digital experiences.',
    ogUrl: env.VITE_OG_URL ?? '',
  },
  github: {
    username: env.VITE_GITHUB_USERNAME ?? '',
  },
}

export const socialLinks = [
  site.social.github && {
    label: 'GitHub',
    href: site.social.github,
    handle: `@${env.VITE_GITHUB_USERNAME}`,
  },
  site.social.twitter && {
    label: 'Twitter',
    href: site.social.twitter,
    handle: `@${env.VITE_TWITTER_USERNAME}`,
  },
  site.social.linkedin && {
    label: 'LinkedIn',
    href: site.social.linkedin,
    handle: `in/${env.VITE_LINKEDIN_USERNAME}`,
  },
  site.social.tiktok && {
    label: 'TikTok',
    href: site.social.tiktok,
    handle: `@${env.VITE_TIKTOK_USERNAME}`,
  },
  site.contact.email && {
    label: 'Email',
    href: `mailto:${site.contact.email}`,
    handle: site.contact.email,
  },
].filter(Boolean)

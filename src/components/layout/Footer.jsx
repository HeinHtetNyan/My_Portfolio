import { Link } from 'react-router-dom'
import { site, socialLinks } from '../../config'

const footerLinks = [
  { label: 'projects', path: '/projects' },
  { label: 'notes', path: '/notes' },
  { label: 'about', path: '/about' },
  { label: 'contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-900 section-padding py-16 mt-20">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div>
          <Link to="/" className="text-white font-black text-2xl tracking-tight">
            {site.name}
          </Link>
          <p className="text-neutral-500 text-sm mt-3 max-w-xs leading-relaxed">
            {site.owner.tagline}
          </p>
        </div>

        <div className="flex gap-20">
          <div>
            <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Pages</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <p className="text-xs text-neutral-600 uppercase tracking-widest mb-4">Social</p>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-16 pt-8 border-t border-neutral-900">
        <p className="text-xs text-neutral-600">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="text-xs text-neutral-600">
          Built with React + Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

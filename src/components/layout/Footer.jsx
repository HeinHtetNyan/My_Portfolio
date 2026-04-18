import { Link } from 'react-router-dom'
import { site, socialLinks } from '../../config'

const footerLinks = [
  { label: 'projects', path: '/projects' },
  { label: 'about', path: '/about' },
  { label: 'contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 divider section-padding pt-16 pb-12 mt-20">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div>
          <Link
            to="/"
            className="text-white font-black text-xl tracking-tight hover:opacity-50 transition-opacity"
          >
            {site.name}
          </Link>
          <p className="text-neutral-700 text-sm mt-3 max-w-[220px] leading-relaxed">
            {site.owner.tagline}
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="label-sm mb-5">Pages</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-600 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <p className="label-sm mb-5">Social</p>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="text-sm text-neutral-600 hover:text-white transition-colors"
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-8 border-t border-white/[0.04]">
        <p className="label-sm text-neutral-800">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="label-sm text-neutral-800">
          React + Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../../config'

const FORMSPREE_ENDPOINT = site.contact.formspreeEndpoint

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  if (!data.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email address.'
  if (!data.message.trim()) errors.message = 'Message is required.'
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

function InputField({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs text-neutral-500 uppercase tracking-widest">
        {label}
      </label>
      {props.as === 'textarea' ? (
        <textarea
          id={id}
          className={`bg-transparent border ${error ? 'border-red-500/50' : 'border-neutral-900'} focus:border-neutral-500 outline-none px-4 py-3 text-sm text-white placeholder-neutral-700 resize-none transition-colors duration-200 min-h-[140px]`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          {...props}
        />
      ) : (
        <input
          id={id}
          className={`bg-transparent border ${error ? 'border-red-500/50' : 'border-neutral-900'} focus:border-neutral-500 outline-none px-4 py-3 text-sm text-white placeholder-neutral-700 transition-colors duration-200`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          {...props}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400" role="alert">{error}</p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('loading')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-neutral-900 p-12 text-center"
          >
            <p className="text-4xl mb-4">✓</p>
            <p className="text-white font-bold text-xl mb-2">Message sent.</p>
            <p className="text-neutral-500 text-sm">I'll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6"
          >
            <InputField
              label="Name"
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <InputField
              label="Message"
              id="message"
              name="message"
              as="textarea"
              placeholder="What's on your mind?"
              value={form.message}
              onChange={handleChange}
              error={errors.message}
            />

            {status === 'error' && (
              <p className="text-sm text-red-400" role="alert">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="border border-white text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send message'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

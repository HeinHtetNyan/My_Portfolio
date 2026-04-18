import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '../../config'

const FORMSPREE_ENDPOINT = site.contact.formspreeEndpoint

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  if (!data.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email.'
  if (!data.message.trim()) errors.message = 'Message is required.'
  else if (data.message.trim().length < 10) errors.message = 'At least 10 characters.'
  return errors
}

function Field({ label, id, error, ...props }) {
  const baseClass = `w-full bg-transparent border-0 border-b pb-3 pt-1 text-base text-white placeholder-neutral-800 outline-none transition-colors duration-300 resize-none ${
    error
      ? 'border-red-500/40'
      : 'border-neutral-800 focus:border-neutral-500'
  }`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-sm">
        {label}
      </label>
      {props.as === 'textarea' ? (
        <textarea
          id={id}
          className={`${baseClass} min-h-[120px]`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          {...props}
        />
      ) : (
        <input
          id={id}
          className={baseClass}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          {...props}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
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
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="py-20 text-center"
        >
          <p className="text-5xl mb-6 select-none">✓</p>
          <p className="text-white font-semibold text-xl mb-2">Message sent.</p>
          <p className="text-neutral-500 text-sm mb-10">I'll get back to you soon.</p>
          <button
            onClick={() => setStatus('idle')}
            className="label-sm text-neutral-700 hover:text-white transition-colors"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-10"
        >
          <Field
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
          <Field
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
          <Field
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
              Something went wrong. Try again or email directly.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.98 }}
            className="self-start text-sm font-semibold uppercase tracking-widest text-white border-b border-white pb-0.5 hover:border-neutral-500 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : 'Send message →'}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

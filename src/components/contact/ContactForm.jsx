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

const inputClass = 'w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white text-base placeholder-neutral-400 dark:placeholder-neutral-600 outline-none px-5 py-4 resize-none transition-colors duration-200 focus:bg-neutral-200 dark:focus:bg-neutral-800'

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
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return }
    setStatus('loading')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (response.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }) }
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
          className="py-20 flex flex-col gap-4"
        >
          <p className="text-neutral-900 dark:text-white font-semibold text-2xl">Message sent.</p>
          <p className="text-neutral-500 text-sm">I'll get back to you within 24 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 label-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors self-start"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-px"
        >
          {/* Name */}
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClass}
            />
            {errors.name && <p id="name-error" role="alert" className="text-xs text-red-500 dark:text-red-400 px-5 py-2 bg-neutral-100 dark:bg-neutral-900">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass}
            />
            {errors.email && <p id="email-error" role="alert" className="text-xs text-red-500 dark:text-red-400 px-5 py-2 bg-neutral-100 dark:bg-neutral-900">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`${inputClass} min-h-[220px]`}
            />
            {errors.message && <p id="message-error" role="alert" className="text-xs text-red-500 dark:text-red-400 px-5 py-2 bg-neutral-100 dark:bg-neutral-900">{errors.message}</p>}
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-500 dark:text-red-400 px-5 py-3 bg-neutral-100 dark:bg-neutral-900" role="alert">
              Something went wrong. Try again or email directly.
            </p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold py-5 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Sending...' : 'Submit'}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

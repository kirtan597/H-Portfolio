import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

function FloatingField({ label, name, type = 'text', textarea }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const active = focused || value.length > 0

  const shared = {
    width: '100%', background: 'none', border: 'none',
    borderBottom: `1px solid ${focused ? '#0A0A0A' : '#CCCCCC'}`,
    outline: 'none', padding: '1.6rem 0 0.6rem',
    fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
    fontWeight: 300, color: '#0A0A0A',
    transition: 'border-color 0.3s', resize: 'none',
  }

  return (
    <div style={{ position: 'relative', marginBottom: '2rem' }}>
      <label style={{
        position: 'absolute',
        top: active ? '0.1rem' : '1.5rem',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: active ? '0.68rem' : '0.92rem',
        fontWeight: active ? 400 : 300,
        letterSpacing: active ? '0.2em' : '0.01em',
        textTransform: active ? 'uppercase' : 'none',
        color: focused ? '#0A0A0A' : '#AAAAAA',
        transition: 'all 0.25s ease', pointerEvents: 'none',
      }}>{label}</label>
      {textarea
        ? <textarea rows={5} name={name} style={shared} value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)} />
        : <input type={type} name={name} style={shared} value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)} />
      }
    </div>
  )
}

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay = 0) => ({
    y: 0, opacity: 1,
    transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = formRef.current
    try {
      await emailjs.send(
        'service_d6xltu2',
        'template_1w1ct3g',
        {
          name:    form.from_name.value,
          email:   form.from_email.value,
          phone:   form.phone.value,
          message: form.message.value,
        },
        'jTO9qtGqV9S-ab-mi'
      )
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('EmailJS error:', err?.text || err?.status || err)
      setStatus('error')
    }
  }
  return (
    <section id="contact" style={{
      background: '#fff', padding: '8rem 4rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="ghost-05" style={{
        position: 'absolute', top: '-3rem', right: '-1rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '18rem',
        fontWeight: 200, color: '#F4F4F4', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
      }}>05</div>

      {/* Section marker */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',
          fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: '#888', marginBottom: '3rem', position: 'relative', zIndex: 1,
        }}>05 / CONTACT</motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '8rem', position: 'relative', zIndex: 1,
        borderTop: '1px solid #EBEBEB', paddingTop: '4rem',
      }} className="contact-grid">

        {/* ── LEFT ── */}
        <div>
          {/* Heading */}
          <motion.div
            variants={fadeUp} custom={0}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ marginBottom: '2.5rem', lineHeight: 0.92 }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
              fontWeight: 300, color: '#0A0A0A', lineHeight: 0.88,
              letterSpacing: '-0.02em',
            }}>Let's Create</div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
              fontWeight: 300, fontStyle: 'italic', color: '#0A0A0A', lineHeight: 0.88,
              letterSpacing: '-0.02em',
            }}>Something</div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
              fontWeight: 300, color: '#0A0A0A', lineHeight: 0.88,
              letterSpacing: '-0.02em',
              marginLeft: '2.5rem',
            }}>Beautiful.</div>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeUp} custom={0.1}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem',
              fontWeight: 300, color: '#666', lineHeight: 1.9, marginBottom: '2.5rem',
            }}>
            Available for bridal commissions, party wear, custom design
            consultations, and bespoke tailoring. Based in Ahmedabad. Working worldwide.
          </motion.p>

          {/* Contact details */}
          <motion.div
            variants={fadeUp} custom={0.18}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ marginBottom: '2.5rem' }}>
            {[
              ['hencybuchiya3539@gmail.com', 'mailto:hencybuchiya3539@gmail.com'],
              ['+91 93169 46138', 'tel:+919316946138'],
              ['Ahmedabad, Gujarat, India', null],
            ].map(([text, href]) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem',
                fontWeight: 300, color: '#333',
                borderBottom: '1px solid #F0F0F0',
                padding: '0.75rem 0',
              }}>
                <span style={{ color: '#BBBBBB' }}>—</span>
                {href
                  ? <a href={href} style={{ color: '#333', textDecoration: 'none' }}>{text}</a>
                  : <span>{text}</span>
                }
              </div>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={fadeUp} custom={0.24}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              {
                href: 'https://www.instagram.com/designs_by_hency/',
                label: 'Instagram',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>,
              },
              {
                href: 'https://www.linkedin.com/in/hency-buchiya-40203a3a2/',
                label: 'LinkedIn',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="3"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8.5"/><path d="M12 16v-5m0 0c0-1.5 4-1.5 4 0v5"/></svg>,
              },
              {
                href: 'https://wa.me/919316946138',
                label: 'WhatsApp',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
              },
              {
                href: 'mailto:hencybuchiya3539@gmail.com',
                label: 'Email',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
              },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                title={label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  border: '1px solid #0A0A0A',
                  color: '#0A0A0A',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0A0A0A' }}
              >{icon}</a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Form ── */}
        <motion.div
          variants={fadeUp} custom={0.15}
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <FloatingField label="Your Name" name="from_name" />
            <FloatingField label="Email Address" name="from_email" type="email" />
            <FloatingField label="Phone Number" name="phone" type="tel" />
            <FloatingField label="Tell me about your vision..." name="message" textarea />

            <button type="submit" disabled={status === 'sending'} style={{
              width: '100%', padding: '1.1rem', marginTop: '0.5rem',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem',
              fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
              background: status === 'success' ? '#2a2a2a' : '#0A0A0A',
              color: '#fff', border: 'none',
              transition: 'background 0.3s',
              opacity: status === 'sending' ? 0.7 : 1,
            }}
              onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#2a2a2a' }}
              onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = '#0A0A0A' }}
            >
              {status === 'sending' ? 'SENDING...' : status === 'success' ? 'MESSAGE SENT ✓' : status === 'error' ? 'FAILED — TRY AGAIN' : 'SEND MESSAGE →'}
            </button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact { padding: 5rem 1.6rem !important; }
          #contact .contact-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
          #contact .ghost-05 { display: none; }
        }
      `}</style>
    </section>
  )
}

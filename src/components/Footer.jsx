const navLinks = ['HOME', 'ABOUT', 'GALLERY', 'TESTIMONIALS', 'CONTACT']
const socialLinks = [
  ['INSTAGRAM', 'https://www.instagram.com/designs_by_hency/'],
  ['LINKEDIN', 'https://www.linkedin.com/in/hency-buchiya-40203a3a2/'],
  ['WHATSAPP', 'https://wa.me/919316946138'],
  ['EMAIL', 'mailto:hencybuchiya3539@gmail.com'],
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{
      background: '#F7F5F2', padding: '5rem 4rem 3rem',
    }}>
      {/* Top row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1px solid #E0DDD9', paddingBottom: '3rem', marginBottom: '3rem',
        flexWrap: 'wrap', gap: '2rem',
      }} className="footer-top">
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '4.5rem',
            fontWeight: 200, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-0.02em',
          }}>HB</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',
            fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#888', marginTop: '0.5rem',
          }}>HENCY BUCHIYA</div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
            fontWeight: 300, color: '#666', marginTop: '0.2rem',
          }}>Fashion Designer · Ahmedabad</div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
              fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
              background: 'none', border: 'none', color: '#888',
              transition: 'color 0.3s', padding: 0,
            }}
              onMouseEnter={e => e.target.style.color = '#0A0A0A'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >{link}</button>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1.5rem',
      }} className="footer-bottom">
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
          fontWeight: 300, color: '#888',
        }}>© 2025 Hency Buchiya. All rights reserved.</div>

        {/* Social */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {socialLinks.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem',
              fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#888', transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.color = '#0A0A0A'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >{label}</a>
          ))}
        </div>

        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '0.78rem',
          fontStyle: 'italic', color: '#999',
        }}>Designed with precision. Worn with confidence.</div>
      </div>

      <style>{`
        footer { padding: 5rem 4rem 3rem; }
        @media (max-width: 768px) {
          footer { padding: 4rem 1.6rem 2.5rem !important; }
          .footer-top { flex-direction: column; align-items: flex-start !important; gap: 2rem !important; }
          .footer-top > div:last-child { gap: 1.2rem !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; gap: 1rem !important; }
        }
      `}</style>
    </footer>
  )
}

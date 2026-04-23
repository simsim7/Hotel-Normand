// Monogram "hn" - hand-crafted SVG inspired by the original with a clocher
const Monogram = ({ size = 44, className = '' }) => (
  <svg viewBox="0 0 80 80" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* tiny clocher */}
    <path d="M40 6 L34 14 L46 14 Z" fill="currentColor" stroke="none" opacity="0.9"/>
    <path d="M40 14 L40 20" />
    {/* h */}
    <path d="M18 26 L18 60 M18 42 C18 38 22 36 26 36 C30 36 32 38 32 42 L32 60" />
    {/* n */}
    <path d="M48 60 L48 38 M48 44 C48 40 52 38 56 38 C60 38 62 40 62 44 L62 60" />
    {/* small bar linking them like a lintel */}
    <path d="M14 70 L66 70" opacity="0.8"/>
  </svg>
);

// Wordmark used in header
const Wordmark = ({ className = '' }) => (
  <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <img src="images/logo-hn.png?v=3" alt="Hôtel Normand" className="brand-logo" style={{ width: 52, height: 52, objectFit: 'contain', display: 'block' }}/>
    <div style={{ lineHeight: 1, fontFamily: 'var(--font-display)' }}>
      <div style={{ fontSize: 18, letterSpacing: '0.02em', fontWeight: 500 }}>L'Hôtel Normand</div>
      <div className="header-brand-sub" style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', marginTop: 4, fontFamily: 'var(--font-sans)', opacity: 0.66 }}>Yport · depuis 1897</div>
    </div>
  </div>
);

window.Monogram = Monogram;
window.Wordmark = Wordmark;

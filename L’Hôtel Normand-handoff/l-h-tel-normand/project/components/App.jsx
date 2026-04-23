const { useState, useEffect } = React;

// Default tweak values — must be valid JSON inside the markers
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "font": "cormorant-manrope",
  "density": "cozy",
  "dark": false,
  "heroVariant": "image"
}/*EDITMODE-END*/;

const PALETTES = {
  cream:   { accent: '#9a6b2f', accentSoft: '#c79a5d', accentSea: '#6d8a94', label: 'Crème & ocre' },
  slate:   { accent: '#4c6b7a', accentSoft: '#7a95a3', accentSea: '#6d8a94', label: 'Ardoise' },
  ivoire:  { accent: '#7a6245', accentSoft: '#b59974', accentSea: '#9ba87c', label: 'Ivoire' },
  brique:  { accent: '#a04f3b', accentSoft: '#c87a62', accentSea: '#7a8899', label: 'Brique' },
};

const FONTS = {
  'cormorant-manrope': { display: "'Cormorant Garamond', Georgia, serif", sans: "'Manrope', system-ui, sans-serif", label: 'Cormorant × Manrope' },
  'playfair-inter':    { display: "'Playfair Display', Georgia, serif",   sans: "'Inter', system-ui, sans-serif",    label: 'Playfair × Inter' },
  'fraunces-dm':       { display: "'Fraunces', Georgia, serif",           sans: "'DM Sans', system-ui, sans-serif",  label: 'Fraunces × DM' },
  'ebgaramond-outfit': { display: "'EB Garamond', Georgia, serif",        sans: "'Outfit', system-ui, sans-serif",   label: 'Garamond × Outfit' },
};

const App = () => {
  const saved = (() => { try { return JSON.parse(localStorage.getItem('hn_tweaks') || '{}'); } catch { return {}; } })();
  const init = { ...TWEAK_DEFAULTS, ...saved };

  const [lang, setLang]   = useState(saved.lang || 'fr');
  const [palette, setPalette] = useState(init.palette);
  const [font, setFont]   = useState(init.font);
  const [density, setDensity] = useState(init.density);
  const [dark, setDark]   = useState(!!init.dark);
  const [heroVariant, setHeroVariant] = useState(init.heroVariant);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaksAvailable, setTweaksAvailable] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('hn_tweaks', JSON.stringify({ lang, palette, font, density, dark, heroVariant }));
  }, [lang, palette, font, density, dark, heroVariant]);

  // Edit mode plumbing
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    setTweaksAvailable(true);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persistEdit = (edits) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  // Apply CSS vars for palette + font
  useEffect(() => {
    const p = PALETTES[palette];
    const f = FONTS[font];
    const root = document.documentElement;
    root.style.setProperty('--accent', p.accent);
    root.style.setProperty('--accent-soft', p.accentSoft);
    root.style.setProperty('--accent-sea', p.accentSea);
    root.style.setProperty('--font-display', f.display);
    root.style.setProperty('--font-sans', f.sans);
    document.body.dataset.density = density;
    document.body.classList.toggle('dark', dark);
  }, [palette, font, density, dark]);

  return (
    <>
      <Header lang={lang} setLang={setLang} dark={dark} onReserve={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}/>
      <Hero lang={lang} variant={heroVariant}/>
      <div className="booking-bar-wrap">
        <BookingBar lang={lang}/>
      </div>
      <Intro lang={lang}/>
      <Rooms lang={lang}/>
      <Restaurant lang={lang}/>
      <Location lang={lang}/>
      <Reviews lang={lang}/>
      <Gallery lang={lang}/>
      <CtaFooter lang={lang}/>

      {tweaksAvailable && tweaksOpen && (
        <div className="tweaks-panel">
          <div className="tweaks-head">
            <div className="tweaks-head-title">Tweaks</div>
            <button onClick={() => setTweaksOpen(false)}><IconClose size={16}/></button>
          </div>
          <div className="tweaks-body">
            <div className="tweak-row">
              <div className="tweak-label">Palette</div>
              <div className="swatch-row">
                {Object.entries(PALETTES).map(([k, v]) => (
                  <button key={k}
                    className={`swatch ${palette === k ? 'active' : ''}`}
                    style={{ background: v.accent }}
                    title={v.label}
                    onClick={() => { setPalette(k); persistEdit({ palette: k }); }}/>
                ))}
              </div>
            </div>
            <div className="tweak-row">
              <div className="tweak-label">Typographie</div>
              <div className="opt-row">
                {Object.entries(FONTS).map(([k, v]) => (
                  <button key={k}
                    className={`opt ${font === k ? 'active' : ''}`}
                    onClick={() => { setFont(k); persistEdit({ font: k }); }}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="tweak-row">
              <div className="tweak-label">Densité</div>
              <div className="opt-row">
                {['compact', 'cozy', 'spacious'].map(k => (
                  <button key={k}
                    className={`opt ${density === k ? 'active' : ''}`}
                    onClick={() => { setDensity(k); persistEdit({ density: k }); }}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <div className="tweak-row">
              <div className="tweak-label">Hero</div>
              <div className="opt-row">
                {[['image','Image'],['split','Split'],['video','Immersif']].map(([k, lbl]) => (
                  <button key={k}
                    className={`opt ${heroVariant === k ? 'active' : ''}`}
                    onClick={() => { setHeroVariant(k); persistEdit({ heroVariant: k }); }}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            <div className={`toggle ${dark ? 'on' : ''}`} onClick={() => { setDark(!dark); persistEdit({ dark: !dark }); }}>
              <div className="tweak-label" style={{ margin: 0 }}>Mode sombre</div>
              <div className="toggle-pill"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

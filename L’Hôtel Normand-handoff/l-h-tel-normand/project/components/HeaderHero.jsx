const { useState: useSt1, useEffect: useEf1 } = React;

// ————— HEADER —————
const Header = ({ lang, setLang, dark, onReserve }) => {
  const t = CONTENT[lang];
  const [scrolled, setScrolled] = useSt1(false);
  useEf1(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#top" className="header-brand">
          <Wordmark />
        </a>
        <nav className="header-nav">
          {t.nav.map((n, i) => (
            <a key={i} href={`#${['hotel','chambres','tarifs','restaurant','seminaires','groupes','pays','infos'][i]}`}
               className={i === 0 ? 'is-active' : ''}>
              {n}
            </a>
          ))}
        </nav>
        <div className="header-right">
          <a href="tel:+33235273076" className="header-phone">
            <IconPhone size={16} />
            <span>+33 (0)2 35 27 30 76</span>
          </a>
          <button className="header-lang" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
            <IconGlobe size={14} />
            <span>{lang.toUpperCase()}</span>
          </button>
          <button className="header-reserve" onClick={onReserve}>
            {t.reserve}
            <IconArrow size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

// ————— BOOKING WIDGET (floats over hero bottom) —————
const BookingBar = ({ lang }) => {
  const t = CONTENT[lang];
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000 * 2);
  const fmt = (d) => d.toISOString().slice(0,10);
  const [arr, setArr] = useSt1(fmt(today));
  const [dep, setDep] = useSt1(fmt(tomorrow));
  const [adults, setAdults] = useSt1(2);
  const [children, setChildren] = useSt1(0);
  const [openGuests, setOpenGuests] = useSt1(false);

  return (
    <div className="booking-bar">
      <div className="booking-eyebrow">
        <span className="dot" />
        <span>{t.bookEyebrow}</span>
      </div>
      <div className="booking-fields">
        <label className="bf">
          <span className="bf-label">{t.bookArrival}</span>
          <div className="bf-input">
            <IconCalendar size={15} />
            <input type="date" value={arr} onChange={e => setArr(e.target.value)} />
          </div>
        </label>
        <span className="bf-sep" />
        <label className="bf">
          <span className="bf-label">{t.bookDeparture}</span>
          <div className="bf-input">
            <IconCalendar size={15} />
            <input type="date" value={dep} onChange={e => setDep(e.target.value)} />
          </div>
        </label>
        <span className="bf-sep" />
        <div className="bf bf-guests">
          <span className="bf-label">{t.bookGuests}</span>
          <button className="bf-input bf-button" onClick={() => setOpenGuests(!openGuests)}>
            <IconBed size={15} />
            <span>{adults + children} · {adults} {t.bookAdults.toLowerCase()}{children ? ', ' + children + ' ' + t.bookChildren.toLowerCase() : ''}</span>
            <IconChevron size={13} />
          </button>
          {openGuests && (
            <div className="bf-popover">
              {[['adults', t.bookAdults, adults, setAdults, 1, 4],
                ['children', t.bookChildren, children, setChildren, 0, 3]].map(([k, lbl, v, setV, mn, mx]) => (
                <div key={k} className="bf-row">
                  <span>{lbl}</span>
                  <div className="bf-stepper">
                    <button onClick={() => setV(Math.max(mn, v - 1))}><IconMinus size={12}/></button>
                    <span>{v}</span>
                    <button onClick={() => setV(Math.min(mx, v + 1))}><IconPlus size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="booking-cta">
          {t.bookCheck}
          <IconArrow size={14} />
        </button>
      </div>
      <div className="booking-or">
        <span>{t.bookOr}</span>
        <a href="tel:+33235273076">+33 (0)2 35 27 30 76</a>
      </div>
    </div>
  );
};

// ————— HERO —————
const Hero = ({ lang, variant }) => {
  const t = CONTENT[lang];
  const [ref, y] = useParallax(0.06);
  const scrollDown = () => window.scrollTo({ top: window.innerHeight - 40, behavior: 'smooth' });

  if (variant === 'split') {
    return (
      <section className="hero hero-split" id="top">
        <div className="hero-split-text">
          <div className="hero-eyebrow">
            <span className="rule"/>
            <span>{t.heroSub}</span>
          </div>
          <h1 className="hero-title">
            <span>{t.heroTitle[0]}</span>{' '}
            <em>{t.heroTitle[1]}</em><br/>
            <span>{t.heroTitle[2]}</span>
          </h1>
          <p className="hero-lede">{t.heroLede}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollDown}>{t.heroCta}<IconArrow size={14}/></button>
            <a href="tel:+33235273076" className="btn-ghost"><IconPhone size={14}/>{t.heroCall}</a>
          </div>
          <div className="hero-since">
            <span className="since-line"/>
            <div>
              <div className="since-label">{t.sinceLabel}</div>
              <div className="since-year">{t.sinceYear}</div>
            </div>
          </div>
        </div>
        <div className="hero-split-image">
          <ParallaxImage src="images/facade.webp" strength={0.05} style={{ height: '100%', width: '100%' }}/>
        </div>
      </section>
    );
  }

  if (variant === 'video') {
    // "video" variant = Ken Burns style slow zoom
    return (
      <section className="hero hero-video" id="top">
        <div className="hero-video-bg" ref={ref}>
          <img src="images/facade.webp" alt="" style={{ transform: `translate3d(0, ${y}px, 0) scale(1.08)` }}/>
          <div className="hero-video-overlay"/>
        </div>
        <div className="hero-video-content">
          <div className="hero-eyebrow light"><span className="rule"/><span>{t.heroSub}</span></div>
          <h1 className="hero-title light">
            <span>{t.heroTitle[0]}</span>{' '}<em>{t.heroTitle[1]}</em><br/>
            <span>{t.heroTitle[2]}</span>
          </h1>
          <p className="hero-lede light">{t.heroLede}</p>
          <div className="hero-actions">
            <button className="btn-primary light" onClick={scrollDown}>{t.heroCta}<IconArrow size={14}/></button>
            <a href="tel:+33235273076" className="btn-ghost light"><IconPhone size={14}/>{t.heroCall}</a>
          </div>
        </div>
      </section>
    );
  }

  // default: "image" — classic photograph hero
  return (
    <section className="hero hero-image" id="top">
      <div className="hero-image-wrap" ref={ref}>
        <img src="images/facade.webp" alt="Façade de l'Hôtel Normand, Yport"
             style={{ transform: `translate3d(0, ${y}px, 0)` }}/>
      </div>
      <div className="hero-image-content">
        <div className="hero-eyebrow"><span className="rule"/><span>{t.heroSub}</span></div>
        <h1 className="hero-title">
          <span>{t.heroTitle[0]}</span>{' '}<em>{t.heroTitle[1]}</em><br/>
          <span>{t.heroTitle[2]}</span>
        </h1>
        <p className="hero-lede hero-lede-over">{t.heroLede}</p>
        <div className="hero-actions">
          <button className="btn-primary light" onClick={scrollDown}>{t.heroCta}<IconArrow size={14}/></button>
          <a href="tel:+33235273076" className="btn-ghost light"><IconPhone size={14}/>{t.heroCall}</a>
        </div>
      </div>
      <div className="hero-corner">
        <div className="since-label">{t.sinceLabel}</div>
        <div className="since-year">{t.sinceYear}</div>
      </div>
      <button className="scroll-hint" onClick={scrollDown} aria-label="scroll">
        <span className="scroll-word">{lang === 'fr' ? 'Descendre' : 'Scroll'}</span>
        <span className="scroll-rule"/>
      </button>
    </section>
  );
};

Object.assign(window, { Header, BookingBar, Hero });

// ————— INTRO SECTION —————
const Intro = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <section className="section intro" id="hotel">
      <div className="intro-grid">
        <Reveal className="intro-text">
          <div className="eyebrow">{t.introEyebrow}</div>
          <h2 className="display-h">{t.introTitle}</h2>
          {t.introBody.map((p, i) => <p key={i} className="lede">{p}</p>)}
          <div className="intro-signature">
            <svg viewBox="0 0 160 40" width="130" height="34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <path d="M4 28 Q12 8 22 22 T40 20 Q46 10 54 22 T72 24 Q80 14 90 22 Q104 32 118 18 Q130 8 146 20 T156 18"/>
            </svg>
            <div>La famille Rouault</div>
          </div>
        </Reveal>
        <Reveal delay={120} className="intro-media">
          <ParallaxImage src="images/hotel2.webp" strength={0.06} style={{ aspectRatio: '3/4' }}/>
          <div className="intro-facts">
            <div className="facts-title">{t.factsTitle}</div>
            <ul>
              {t.facts.map(([big, small], i) => (
                <li key={i}>
                  <span className="fact-big">{big}</span>
                  <span className="fact-small">{small}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Reveal delay={200} className="amenities-strip">
        {t.amenities.map(([name, desc], i) => (
          <div className="amenity" key={i}>
            <span className="amenity-num">0{i+1}</span>
            <div>
              <div className="amenity-name">{name}</div>
              <div className="amenity-desc">{desc}</div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

// ————— ROOMS SECTION —————
const Rooms = ({ lang }) => {
  const t = CONTENT[lang];
  const imgs = ['images/chambre1.jpg', 'images/hotel2.webp', 'images/terrasse.jpg'];
  return (
    <section className="section rooms" id="chambres">
      <div className="section-head">
        <Reveal>
          <div className="eyebrow">{t.roomsEyebrow}</div>
          <h2 className="display-h">{t.roomsTitle}</h2>
          <p className="lede" style={{ maxWidth: 560 }}>{t.roomsLede}</p>
        </Reveal>
      </div>
      <div className="rooms-grid">
        {t.rooms.map((r, i) => (
          <Reveal delay={i * 90} key={i} className="room-card">
            <div className="room-image">
              <img src={imgs[i]} alt={r.name}/>
              <span className="room-index">0{i+1}</span>
            </div>
            <div className="room-body">
              <div className="room-tag">{r.tag}</div>
              <h3 className="room-name">{r.name}</h3>
              <p className="room-desc">{r.desc}</p>
              <div className="room-bottom">
                <div className="room-price">
                  <span className="small">{t.priceFrom}</span>
                  <span className="big">{r.price}€</span>
                  <span className="small">{t.priceNight}</span>
                </div>
                <button className="room-link">
                  <span>{lang === 'fr' ? 'Découvrir' : 'Discover'}</span>
                  <IconArrow size={13}/>
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="rooms-all">
        <button className="btn-link">
          <span>{t.roomsCta}</span><IconArrow size={14}/>
        </button>
      </Reveal>
    </section>
  );
};

// ————— RESTAURANT SECTION (expanded) —————
const Restaurant = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <section className="section restaurant" id="restaurant">
      {/* Main grid: text + 2 photos */}
      <div className="resto-grid">
        <Reveal className="resto-text">
          <div className="eyebrow">{t.restoEyebrow}</div>
          <h2 className="display-h">{t.restoTitle}</h2>
          <p className="lede">{t.restoBody}</p>
          <ul className="resto-facts">
            {t.restoFacts.map((f, i) => (
              <li key={i}><span className="bullet"/>{f}</li>
            ))}
          </ul>
          <button className="btn-primary">{t.restoCta}<IconArrow size={14}/></button>
        </Reveal>
        <Reveal delay={120} className="resto-media resto-tall">
          <ParallaxImage src="images/resto-salle1.webp" strength={0.06} style={{ aspectRatio: '3/4' }}/>
        </Reveal>
        <Reveal delay={200} className="resto-media resto-wide">
          <ParallaxImage src="images/terrasse.jpg" strength={0.05} style={{ aspectRatio: '3/4' }}/>
        </Reveal>
      </div>

      {/* Quote band */}
      <Reveal className="resto-quote">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
          <path d="M12 28c0-6 4-10 10-11M26 28c0-6 4-10 10-11" strokeLinecap="round"/>
        </svg>
        <blockquote>« {t.restoQuote} »</blockquote>
        <cite>— {t.restoQuoteSrc}</cite>
      </Reveal>

      {/* Three dining spaces */}
      <div className="resto-rooms">
        <Reveal className="resto-rooms-head">
          <h3 className="display-h">{t.restoRoomsTitle}</h3>
        </Reveal>
        <div className="resto-rooms-grid">
          {[
            'images/resto-salle2.webp',
            'images/resto-petite-salle.webp',
            'images/resto-salle4.webp',
          ].map((src, i) => (
            <Reveal delay={i * 100} key={i} className="resto-room">
              <div className="resto-room-img">
                <img src={src} alt={t.restoRooms[i].name}/>
              </div>
              <div className="resto-room-body">
                <div className="resto-room-index">{`0${i+1}`} · {lang === 'fr' ? 'Espace' : 'Room'}</div>
                <div className="resto-room-name">{t.restoRooms[i].name}</div>
                <p className="resto-room-desc">{t.restoRooms[i].desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ————— LOCATION —————
const Location = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <section className="section location" id="pays">
      <div className="loc-grid">
        <Reveal className="loc-text">
          <div className="eyebrow">{t.locationEyebrow}</div>
          <h2 className="display-h">{t.locationTitle}</h2>
          <p className="lede">{t.locationBody}</p>
        </Reveal>
        <Reveal delay={100} className="loc-map">
          <div className="map-face">
            {/* stylized coast illustration placeholder */}
            <svg viewBox="0 0 400 480" width="100%" height="100%" fill="none">
              <rect width="400" height="480" fill="var(--bg-alt)"/>
              {/* sea */}
              <rect y="0" width="400" height="170" fill="var(--accent-sea)" opacity="0.25"/>
              {/* waves */}
              {[40, 70, 100, 130].map(y => (
                <path key={y} d={`M0 ${y} Q 50 ${y-6} 100 ${y} T 200 ${y} T 300 ${y} T 400 ${y}`}
                      stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="0.8" fill="none"/>
              ))}
              {/* coastline */}
              <path d="M0 170 L 60 170 L 90 160 L 140 175 L 200 165 L 260 178 L 320 168 L 400 172 L 400 480 L 0 480 Z"
                    fill="var(--bg)" stroke="var(--ink)" strokeOpacity="0.5" strokeWidth="1"/>
              {/* roads */}
              <path d="M80 480 L 120 380 L 180 330 L 220 300 L 290 230 L 320 170" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4" fill="none"/>
              <path d="M320 480 L 280 380 L 230 330 L 220 300" stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4" fill="none"/>
              {/* Yport marker */}
              <circle cx="220" cy="300" r="6" fill="var(--accent)"/>
              <circle cx="220" cy="300" r="12" fill="none" stroke="var(--accent)" strokeWidth="1"/>
              <text x="234" y="303" fontFamily="var(--font-display)" fontSize="16" fontStyle="italic" fill="var(--ink)">Yport</text>
              {/* Étretat */}
              <circle cx="90" cy="165" r="3" fill="var(--ink)"/>
              <text x="60" y="155" fontSize="10" fontFamily="var(--font-sans)" fill="var(--ink)" opacity="0.7">ÉTRETAT</text>
              {/* Fécamp */}
              <circle cx="320" cy="170" r="3" fill="var(--ink)"/>
              <text x="300" y="160" fontSize="10" fontFamily="var(--font-sans)" fill="var(--ink)" opacity="0.7">FÉCAMP</text>
              <text x="20" y="40" fontSize="10" letterSpacing="3" fontFamily="var(--font-sans)" fill="var(--ink)" opacity="0.55">LA MANCHE</text>
              <text x="20" y="460" fontSize="9" letterSpacing="2" fontFamily="var(--font-sans)" fill="var(--ink)" opacity="0.4">PAYS DE CAUX — NORMANDIE</text>
            </svg>
          </div>
        </Reveal>
      </div>
      <Reveal className="loc-places">
        {t.locationPlaces.map(([n, name, dist], i) => (
          <div key={i} className="place">
            <div className="place-num">{n}</div>
            <div className="place-name">{name}</div>
            <div className="place-dist">{dist}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
};

// ————— REVIEWS —————
const Reviews = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <section className="section reviews">
      <div className="section-head center">
        <Reveal>
          <div className="eyebrow">{t.reviewsEyebrow}</div>
          <h2 className="display-h">{t.reviewsTitle}</h2>
        </Reveal>
      </div>
      <div className="reviews-grid">
        {t.reviews.map((r, i) => (
          <Reveal delay={i * 120} key={i} className="review-card">
            <div className="review-stars">
              {Array.from({ length: r.stars }).map((_, j) => <IconStar key={j} size={14}/>)}
            </div>
            <p className="review-text">« {r.text} »</p>
            <div className="review-foot">
              <div className="review-who">{r.who}</div>
              <div className="review-src">{r.src}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ————— GALLERY —————
const Gallery = ({ lang }) => {
  const t = CONTENT[lang];
  const items = [
    { src: 'images/facade.webp', span: 'tall' },
    { src: 'images/terrasse.jpg', span: 'wide' },
    { src: 'images/restaurant.jpg', span: 'square' },
    { src: 'images/chambre1.jpg', span: 'square' },
    { src: 'images/restaurant2.jpg', span: 'tall' },
    { src: 'images/hotel2.webp', span: 'wide' },
    { src: 'images/massage.jpg', span: 'square' },
    { src: 'images/restaurant-hero.webp', span: 'square' },
  ];
  return (
    <section className="section gallery">
      <div className="section-head">
        <Reveal>
          <div className="eyebrow">{t.galleryEyebrow}</div>
          <h2 className="display-h">{t.galleryTitle}</h2>
        </Reveal>
      </div>
      <div className="gallery-grid">
        {items.map((it, i) => (
          <Reveal delay={i * 50} key={i} className={`gallery-item g-${it.span}`}>
            <img src={it.src} alt=""/>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ————— CTA + FOOTER —————
const CtaFooter = ({ lang }) => {
  const t = CONTENT[lang];
  return (
    <>
      <section className="section cta-section" id="infos">
        <div className="cta-grid">
          <Reveal className="cta-text">
            <div className="eyebrow">{t.ctaEyebrow}</div>
            <h2 className="display-h">{t.ctaTitle}</h2>
            <p className="lede">{t.ctaBody}</p>
          </Reveal>
          <Reveal delay={80} className="cta-card">
            <div className="cta-row">
              <IconPhone size={18}/>
              <div>
                <div className="cta-lbl">{lang === 'fr' ? 'Téléphone' : 'Phone'}</div>
                <a href="tel:+33235273076">{t.ctaPhone}</a>
              </div>
            </div>
            <div className="cta-row">
              <IconMail size={18}/>
              <div>
                <div className="cta-lbl">Email</div>
                <a href={`mailto:${t.ctaEmail}`}>{t.ctaEmail}</a>
              </div>
            </div>
            <div className="cta-row">
              <IconPin size={18}/>
              <div>
                <div className="cta-lbl">{lang === 'fr' ? 'Adresse' : 'Address'}</div>
                <div>{t.ctaAddress}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Monogram size={56}/>
            <div className="footer-name">{t.footerCol1}</div>
            <p className="footer-tag">{t.footerCol1Body}</p>
          </div>
          <div>
            <div className="footer-h">{t.footerNav}</div>
            <ul className="footer-list">
              {t.nav.map((n, i) => <li key={i}><a href="#">{n}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-h">{t.footerContact}</div>
            <ul className="footer-list">
              <li>{t.ctaAddress}</li>
              <li><a href="tel:+33235273076">{t.ctaPhone}</a></li>
              <li><a href={`mailto:${t.ctaEmail}`}>{t.ctaEmail}</a></li>
            </ul>
            <div className="footer-h" style={{ marginTop: 24 }}>{lang === 'fr' ? 'Horaires' : 'Hours'}</div>
            <div className="footer-hours">{t.footerHours}</div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>{t.footerLegal}</div>
          <div className="footer-made">Made with care · Yport</div>
        </div>
      </footer>
    </>
  );
};

Object.assign(window, { Intro, Rooms, Restaurant, Location, Reviews, Gallery, CtaFooter });

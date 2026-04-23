const { useState, useEffect, useRef } = React;

// Reveal hook — fade/translate on enter viewport
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
};

// Parallax offset for an element based on its center distance from viewport center
const useParallax = (strength = 0.12) => {
  const ref = useRef(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const delta = (window.innerHeight / 2 - center);
      setY(delta * strength);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [strength]);
  return [ref, y];
};

// Reveal wrapper
const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 900ms ${delay}ms cubic-bezier(.2,.7,.2,1), transform 900ms ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      }}
    >
      {children}
    </Tag>
  );
};

// Parallax image
const ParallaxImage = ({ src, alt = '', strength = 0.08, style = {}, className = '' }) => {
  const [ref, y] = useParallax(strength);
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', position: 'relative', ...style }}>
      <img src={src} alt={alt}
           style={{
             width: '100%', height: '115%', objectFit: 'cover',
             position: 'absolute', inset: '-7.5% 0 0 0',
             transform: `translate3d(0, ${y}px, 0)`,
             transition: 'transform 120ms linear',
           }} />
    </div>
  );
};

window.useReveal = useReveal;
window.useParallax = useParallax;
window.Reveal = Reveal;
window.ParallaxImage = ParallaxImage;

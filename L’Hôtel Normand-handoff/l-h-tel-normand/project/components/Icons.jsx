// Simple hairline icons drawn as SVG strokes
const Icon = ({ d, size = 20, stroke = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);

const IconPhone = (p) => <Icon {...p} d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>;
const IconMail  = (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></>}/>;
const IconPin   = (p) => <Icon {...p} d={<><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>}/>;
const IconArrow = (p) => <Icon {...p} d="M5 12h14M13 6l6 6-6 6"/>;
const IconStar  = (p) => <Icon {...p} stroke={1.2} d="M12 3l2.6 5.6L20 9.5l-4 4 1 6-5-2.8L7 19.5l1-6-4-4 5.4-.9L12 3z"/>;
const IconClose = (p) => <Icon {...p} d="M6 6l12 12M18 6L6 18"/>;
const IconChevron = (p) => <Icon {...p} d="M6 9l6 6 6-6"/>;
const IconGlobe = (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></>}/>;
const IconMinus = (p) => <Icon {...p} d="M5 12h14"/>;
const IconPlus  = (p) => <Icon {...p} d="M12 5v14M5 12h14"/>;
const IconCalendar = (p) => <Icon {...p} d={<><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18M8 3v4M16 3v4"/></>}/>;
const IconWifi = (p) => <Icon {...p} d={<><path d="M2 8.5a15 15 0 0 1 20 0"/><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="0.5" fill="currentColor"/></>}/>;
const IconBed = (p) => <Icon {...p} d={<><path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M3 15h18M7 11V9a1 1 0 0 1 1-1h3v3"/></>}/>;
const IconUtensils = (p) => <Icon {...p} d={<><path d="M7 3v8a2 2 0 0 0 2 2v8"/><path d="M5 3v6M9 3v6M15 3c-1.5 2-2 5 0 8v10"/></>}/>;
const IconWave = (p) => <Icon {...p} d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>;

Object.assign(window, { Icon, IconPhone, IconMail, IconPin, IconArrow, IconStar, IconClose, IconChevron, IconGlobe, IconMinus, IconPlus, IconCalendar, IconWifi, IconBed, IconUtensils, IconWave });

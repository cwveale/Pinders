// Minimal, sharp SVG icons
const Icon = {
  arrow: (p={}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrowUp: (p={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 11L11 4M5 4h6v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>,
  leaf: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 20C4 12 10 4 20 4c0 10-8 16-16 16z M4 20l10-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pin: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" stroke="currentColor" strokeWidth="1.3"/><circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.3"/></svg>,
  star: (p={}) => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"/></svg>,
  check: (p={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  phone: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  mail: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.3"/></svg>,
  close: (p={}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  plus: (p={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  minus: (p={}) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  sun: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  mark: (p={}) => (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" {...p}>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1"/>
      <path d="M14 12h8a5 5 0 0 1 0 10h-5v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27 8c2 3 2 7-1 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
};
window.Icon = Icon;

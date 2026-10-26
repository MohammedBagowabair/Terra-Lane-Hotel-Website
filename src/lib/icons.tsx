type P = { size?: number; className?: string };
export const WaIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);
const line = (d: string) => ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}><path d={d} /></svg>
);
export const IcGuests = line('M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 4.2a3.5 3.5 0 0 1 0 6.6');
export const IcBed = line('M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 15h18M7 9V6h4v3M13 9V6h4v3');
export const IcSize = line('M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5');
export const IcArrow = line('M5 12h14M13 6l6 6-6 6');
export const IcPlus = line('M12 5v14M5 12h14');
export const IcPin = line('M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5');
export const IcMail = line('M3 6h18v12H3zM3 7l9 6 9-6');
export const IcPhone = line('M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2');
export const IcCheck = line('M5 12.5l4.5 4.5L19 7');
export const IcPool = line('M2 18c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8');
export const IcSpa = line('M12 20c-4.4 0-8-3-8-7 2.5 0 5 1 8 4 3-3 5.5-4 8-4 0 4-3.6 7-8 7ZM12 17c-2-2-2.5-6 0-10 2.5 4 2 8 0 10');
export const IcGym = line('M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12');
export const IcMeet = line('M3 5h18v11H3zM8 20h8M12 16v4');
export const IcDine = line('M7 3v8a2 2 0 0 0 2 2v8M11 3v8M5 3v8M17 21V3c-2 1-3 4-3 8h3');
export const IcKey = line('M15 7a4 4 0 1 1-3.5 6L4 20.5V17h3v-3h3l1.5-1.5A4 4 0 0 1 15 7ZM16 8h.01');
export const IcCar = line('M5 17h14v-5l-2-5H7l-2 5zM5 17v2M19 17v2M7.5 14h.01M16.5 14h.01');
export const IcWifi = line('M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01');
export const IcLeaf = line('M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l7-7');
export const IcSun = line('M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8');
export const IcShirt = line('M8 3 4 6l2 4 2-1v12h8V9l2 1 2-4-4-3a4 4 0 0 1-8 0');
export const IcShield = line('M12 21s8-3.5 8-10V5l-8-3-8 3v6c0 6.5 8 10 8 10ZM9 12l2 2 4-4');
export const IcClock = line('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2');
export const IcChat = line('M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12Z');

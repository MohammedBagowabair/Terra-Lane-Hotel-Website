import { useEffect, useRef } from 'react';
import { srcSet, imgUrl } from './Pic';

export type Shot = { name: string; alt: string; cap?: string };
type Props = { shots: Shot[]; index: number | null; onIndex: (i: number | null) => void; label: string; className?: string };

/** Accessible lightbox: Esc closes, arrow keys and swipe navigate, focus is kept inside and restored on close. */
export function Lightbox({ shots, index, onIndex, label, className = '' }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLElement | null>(null);
  const touch = useRef<number | null>(null);
  const open = index !== null;
  const n = shots.length;
  const go = (d: number) => index !== null && onIndex((index + d + n) % n);

  useEffect(() => {
    if (!open) return;
    back.current = document.activeElement as HTMLElement;
    closeBtn.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; back.current?.focus(); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onIndex(null);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>('button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });

  if (!open) return null;
  const s = shots[index];
  return (
    <div className={`lb ${className}`} role="dialog" aria-modal="true" aria-label={label} ref={box}
      onClick={(e) => { if (e.target === e.currentTarget) onIndex(null); }}
      onTouchStart={(e) => { touch.current = e.touches[0]?.clientX ?? null; }}
      onTouchEnd={(e) => { const x = e.changedTouches[0]?.clientX; if (touch.current !== null && x !== undefined && Math.abs(x - touch.current) > 45) go(x < touch.current ? 1 : -1); touch.current = null; }}>
      <button ref={closeBtn} className="lb-close" type="button" aria-label="Close gallery" onClick={() => onIndex(null)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <figure className="lb-fig">
        <picture key={s.name}>
          <source type="image/avif" srcSet={srcSet(s.name, 'avif')} sizes="100vw" />
          <img src={imgUrl(s.name)} alt={s.alt} />
        </picture>
        <figcaption><span>{s.cap ?? s.alt}</span><span className="lb-count" aria-live="polite">{index + 1} / {n}</span></figcaption>
      </figure>
      <button className="lb-nav lb-prev" type="button" aria-label="Previous photo" onClick={() => go(-1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button className="lb-nav lb-next" type="button" aria-label="Next photo" onClick={() => go(1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

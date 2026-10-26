import { useEffect, useState } from 'react';
import { IMG } from '@/images';

const BASE = import.meta.env.BASE_URL;

/** True once the page has loaded, so below-the-fold images never compete with the first screen. */
export function useAfterLoad() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') { const t = setTimeout(() => setReady(true), 30); return () => clearTimeout(t); }
    const on = () => setReady(true);
    window.addEventListener('load', on, { once: true });
    return () => window.removeEventListener('load', on);
  }, []);
  return ready;
}

export const srcSet = (name: string, ext: string, widths = [640, 1024, 1600]) => widths.map((w) => `${BASE}img/${name}-${w}.${ext} ${w}w`).join(', ');
export const imgUrl = (name: string, w = 1600) => `${BASE}img/${name}-${w}.webp`;

type Props = { name: string; alt: string; sizes?: string; className?: string };

/** Responsive AVIF/WebP picture served from /public/img, rendered after page load. */
export function Pic({ name, alt, sizes = '100vw', className }: Props) {
  const ready = useAfterLoad();
  const d = IMG[name];
  if (!ready) return <span className="pic-ph" aria-hidden="true" />;
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, 'webp')} sizes={sizes} />
      <img src={imgUrl(name, 1024)} alt={alt} className={className} loading="lazy" decoding="async" width={d?.w ?? 1600} height={d?.h ?? 1067} />
    </picture>
  );
}

/** Hero picture: portrait crop on phones, landscape on larger screens. Preloaded in index.html. */
export function HeroPic({ alt, className }: { alt: string; className?: string }) {
  return (
    <picture>
      <source type="image/avif" media="(max-width: 767px)" srcSet={`${BASE}img/hero-m480.avif 480w, ${BASE}img/hero-m750.avif 750w`} sizes="100vw" />
      <source type="image/webp" media="(max-width: 767px)" srcSet={`${BASE}img/hero-m480.webp 480w, ${BASE}img/hero-m750.webp 750w`} sizes="100vw" />
      <source type="image/avif" srcSet={`${BASE}img/hero-1024.avif 1024w, ${BASE}img/hero-1600.avif 1600w`} sizes="100vw" />
      <source type="image/webp" srcSet={`${BASE}img/hero-1024.webp 1024w, ${BASE}img/hero-1600.webp 1600w`} sizes="100vw" />
      <img src={`${BASE}img/hero-1024.webp`} alt={alt} className={className} decoding="async" fetchPriority="high" width={1600} height={1067} />
    </picture>
  );
}

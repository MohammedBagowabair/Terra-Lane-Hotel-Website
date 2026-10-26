import { useEffect, useState, type MouseEvent } from 'react';
import { HeroPic, Pic } from '@/lib/Pic';
import { Lightbox, type Shot } from '@/lib/Lightbox';
import { PHONE_DISPLAY, TEL, generalMsg, roomMsg, waUrl } from '@/lib/wa';
import { CREDITS } from '@/images';
import { MapPlaceholder } from '@/lib/MapPlaceholder';
import {
  WaIcon, IcGuests, IcBed, IcSize, IcArrow, IcGym, IcDine, IcMeet, IcSun, IcKey, IcWifi, IcShirt, IcCar,
  IcPin, IcMail, IcPhone, IcPlus, IcCheck,
} from '@/lib/icons';

const HOTEL = 'Terra Lane Hotel';
const NAV = [
  { href: '#rooms', label: 'Stay' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
  { href: '#contact', label: 'Contact' },
];

const ROOMS = [
  {
    id: 'studio', img: 'room-studio', name: 'Lane Studio', alt: 'Compact bedroom with a queen bed, dark curtains and a patterned feature wall',
    text: 'A smart, compact room for solo trips and short city breaks, with a proper desk and a deep mattress.',
    guests: '1–2 adults', bed: 'Queen', size: 'Approx. 20 m²', amen: ['Work desk', 'Rain shower', 'Smart TV', 'Fast Wi-Fi'],
  },
  {
    id: 'courtyard', img: 'room-courtyard', name: 'Courtyard Room', alt: 'Light, modern room with a sofa, low table and wall-mounted TV',
    text: 'Our most-requested room, set around the inner courtyard with a sofa corner and soft morning light.',
    guests: '2 adults', bed: 'King', size: 'Approx. 26 m²', amen: ['Courtyard outlook', 'Sofa corner', 'Coffee and tea set', 'Blackout curtains'],
  },
  {
    id: 'loft', img: 'room-loft', name: 'Shophouse Loft', alt: 'Loft living area with a velvet sofa, timber shelving and tall shuttered windows',
    text: 'Split across two levels under the original roof beams, with tall shuttered windows over the lane.',
    guests: '2 adults + 1 child', bed: 'King', size: 'Approx. 42 m²', amen: ['Separate lounge', 'Tall shuttered windows', 'Bathtub', 'Record player'],
  },
  {
    id: 'family', img: 'room-family', name: 'Family Room', alt: 'Warmly lit room with two double beds, armchairs and a window',
    text: 'Two double beds and space to spread out, a short walk from hawker centres and the MRT.',
    guests: '2 adults + 2 children', bed: 'Two doubles', size: 'Approx. 36 m²', amen: ['Cots on request', 'Armchair corner', 'Mini fridge', 'Connecting option'],
  },
];

const GALLERY: Shot[] = [
  { name: 'g7', alt: 'Row of pastel shophouses with shuttered windows along a quiet street', cap: 'Shophouse row nearby' },
  { name: 'g5', alt: 'Bedroom with a white bed beneath an exposed red-brick arch', cap: 'Brick arch bedroom' },
  { name: 'g9', alt: 'Bowl of curry noodle soup with herbs and a spoon', cap: 'Laksa down the lane' },
  { name: 'g1', alt: 'Bright heritage dining room with timber chairs and white walls', cap: 'Heritage dining room' },
  { name: 'g3', alt: 'Freestanding white bathtub beneath tall shuttered windows', cap: 'Freestanding tub' },
  { name: 'g8', alt: 'Ornate shophouse facade with vertical Chinese calligraphy signage', cap: 'Old signage, new life' },
  { name: 'g4', alt: 'Twin timber vanities with round mirrors along a white corridor', cap: 'Twin vanities' },
  { name: 'g10', alt: 'Noodle bowl with chopsticks beside a parcel wrapped in banana leaf', cap: 'Local breakfast favourites' },
  { name: 'g6', alt: 'Long, calm corridor with timber floors leading to a bright window', cap: 'Quiet corridors' },
  { name: 'g2', alt: 'Sitting room with rattan armchairs, a timber table and framed art', cap: 'The reading room' },
  { name: 'g11', alt: 'Colourful three-storey shophouses with cars parked in front', cap: 'Neighbourhood colour' },
  { name: 'g12', alt: 'Tree-lined footpath beside low-rise heritage buildings', cap: 'Shaded morning walk' },
];

const FAQ = [
  { q: 'How do I check availability?', a: 'Message us on WhatsApp with your dates and number of guests. We reply with the rooms available and current rates before anything is confirmed.' },
  { q: 'What are the check-in and check-out times?', a: 'Check-in is from 3:00 pm and check-out is until 11:00 am. Ask us about early arrival or a late check-out and we will help when rooms allow.' },
  { q: 'Is there a pool or spa?', a: 'No. Terra Lane is a small shophouse hotel focused on comfortable rooms and the neighbourhood around it. We are happy to suggest nearby options.' },
  { q: 'Is breakfast available?', a: 'Many guests prefer the local breakfast stalls nearby. We share our favourite picks at check-in, and simple grab-and-go breakfast can be arranged on request.' },
  { q: 'Can I store luggage before check-in?', a: 'Yes. Luggage storage is free on your arrival and departure days.' },
  { q: 'How do I get there from the airport?', a: 'By MRT, taxi or a private transfer we can arrange on request. Send us your flight details and we will share the simplest route.' },
];

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`mark${light ? ' mark-light' : ''}`} aria-label={`${HOTEL}, back to top`}>
      <span className="mark-tl" aria-hidden="true">TL</span>
      <span>Terra Lane<small>Shophouse Hotel · Singapore</small></span>
    </a>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [lb, setLb] = useState<number | null>(null);
  const general = waUrl(generalMsg(HOTEL));
  const go = (e: MouseEvent, href: string) => {
    e.preventDefault();
    setMenu(false);
    const smooth = (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') as ScrollBehavior;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: smooth });
      history.replaceState(null, '', href);
    }));
  };

  useEffect(() => {
    if (!menu) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', k);
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#menu a')?.focus({ preventScroll: true }));
    return () => {
      window.removeEventListener('keydown', k); document.documentElement.style.overflow = '';
      if (document.activeElement === document.body || document.activeElement?.closest('#menu')) document.querySelector<HTMLElement>('.menu-btn')?.focus({ preventScroll: true });
    };
  }, [menu]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hdr">
        <div className="hdr-in">
          <Wordmark />
          <nav className="dnav" aria-label="Primary">{NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
          <a className="hdr-wa" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} /><span>Check availability</span></a>
          <button className="menu-btn" type="button" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(!menu)}>
            <span className="menu-lbl">{menu ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>
      <div id="menu" className={`full${menu ? ' open' : ''}`} hidden={!menu} role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Mobile">
          {NAV.map((n, i) => <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}><small>0{i + 1}</small>{n.label}</a>)}
        </nav>
        <a className="btn btn-cream" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Check Availability on WhatsApp</a>
        <button type="button" className="full-close" onClick={() => setMenu(false)}>Close menu</button>
      </div>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-h">
          <div className="hero-copy">
            <p className="eyebrow">Boutique shophouse hotel · Singapore</p>
            <h1 id="hero-h">Stay on the lane, <span>live like a local.</span></h1>
            <p className="hero-lead">Twenty-four rooms in restored shophouses, with hawker stalls, heritage streets and the MRT right outside the door.</p>
            <div className="hero-cta">
              <a className="btn btn-terra" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Check Availability on WhatsApp</a>
              <a className="btn btn-line" href="#rooms">Explore Rooms<IcArrow size={18} /></a>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-main"><HeroPic alt="Colourful restored shophouses with shuttered windows (illustrative photo)" className="hero-img" /></div>
            <div className="hero-chip" aria-hidden="true"><strong>24</strong><span>rooms in<br />restored shophouses</span></div>
            <p className="hero-note">Fictional hotel concept · illustrative photography</p>
          </div>
        </section>

        <section className="intro wrap" aria-labelledby="intro-h">
          <div className="intro-txt">
            <p className="eyebrow">The idea</p>
            <h2 id="intro-h">A small hotel with a big neighbourhood.</h2>
            <p className="body">Terra Lane is a hotel concept set in a row of pre-war shophouses. We kept the tall shutters, timber stairs and five-foot way, then added quiet rooms, good beds and a team who know where the best laksa is. No pool, no spa: just a comfortable base for exploring the city on foot.</p>
            <ul className="ticks">
              {['Restored heritage architecture', 'Hawker food within a few minutes’ walk', 'Friendly local tips from our team'].map((t) => <li key={t}><IcCheck size={18} />{t}</li>)}
            </ul>
          </div>
          <figure className="intro-img">
            <Pic name="intro" alt="Heritage shophouse street with a traditional clan association sign" sizes="(min-width: 1024px) 40vw, 100vw" />
            <figcaption>Illustrative street scene</figcaption>
          </figure>
        </section>

        <section id="rooms" className="rooms" aria-labelledby="rooms-h">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Stay</p>
              <h2 id="rooms-h">Four rooms, one lane</h2>
              <p className="body">Every room has air conditioning, a rain shower and fast Wi-Fi. Message us for today&rsquo;s rates.</p>
            </div>
            <div className="room-list">
              {ROOMS.map((r, i) => (
                <article className="room" key={r.id} aria-labelledby={`r-${r.id}`}>
                  <span className="room-no" aria-hidden="true">0{i + 1}</span>
                  <figure><Pic name={r.img} alt={r.alt} sizes="(min-width: 1024px) 45vw, 100vw" /></figure>
                  <div className="room-body">
                    <h3 id={`r-${r.id}`}>{r.name}</h3>
                    <p>{r.text}</p>
                    <dl className="specs">
                      <div><dt><IcGuests size={18} /><span className="sr">Guests</span></dt><dd>{r.guests}</dd></div>
                      <div><dt><IcBed size={18} /><span className="sr">Bed</span></dt><dd>{r.bed}</dd></div>
                      <div><dt><IcSize size={18} /><span className="sr">Size</span></dt><dd>{r.size}</dd></div>
                    </dl>
                    <ul className="amen">{r.amen.map((a) => <li key={a}>{a}</li>)}</ul>
                    <a className="btn btn-terra" href={waUrl(roomMsg(r.name, HOTEL))} target="_blank" rel="noopener noreferrer" aria-label={`Check availability for the ${r.name} on WhatsApp`}>
                      <WaIcon size={18} />Check Availability
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities" className="fac" aria-labelledby="fac-h">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Facilities</p>
              <h2 id="fac-h">Small hotel, well thought through</h2>
            </div>
            <div className="bento">
              <article className="b b-dine">
                <Pic name="fac-dining" alt="Open-air hawker courtyard with tables under colourful bunting" sizes="(min-width: 1024px) 50vw, 100vw" />
                <div className="b-txt"><h3><IcDine size={20} />Hawker courtyard nearby</h3><p>Breakfast, lunch and late suppers at the food centre a short walk away.</p></div>
              </article>
              <article className="b b-food">
                <Pic name="fac-food" alt="Bowl of curry with egg and vegetables" sizes="(min-width: 1024px) 25vw, 100vw" />
                <div className="b-txt"><h3>Local food guide</h3><p>Our hand-drawn map of favourite stalls, updated by the team.</p></div>
              </article>
              <article className="b b-fit">
                <Pic name="fac-fitness" alt="Compact gym with treadmills and weight machines" sizes="(min-width: 1024px) 25vw, 100vw" />
                <div className="b-txt"><h3><IcGym size={20} />Fitness room</h3><p>Cardio and weights, open 24 hours.</p></div>
              </article>
              <article className="b b-meet">
                <Pic name="fac-meet" alt="Small meeting room with purple chairs around an oval table" sizes="(min-width: 1024px) 25vw, 100vw" />
                <div className="b-txt"><h3><IcMeet size={20} />Meeting room</h3><p>Seats eight, with screen and fast Wi-Fi.</p></div>
              </article>
              <article className="b b-ter">
                <Pic name="fac-terrace" alt="Lounge with grey sofas beneath a louvred roof" sizes="(min-width: 1024px) 25vw, 100vw" />
                <div className="b-txt"><h3><IcSun size={20} />Louvred lounge</h3><p>A shaded spot for coffee, reading and planning the day.</p></div>
              </article>
              <article className="b b-svc">
                <h3>Also included</h3>
                <ul>
                  {[{ i: IcKey, l: '24-hour reception' }, { i: IcWifi, l: 'Wi-Fi throughout' }, { i: IcShirt, l: 'Self-service laundry' }, { i: IcCar, l: 'Transfers on request' }].map((s) => <li key={s.l}><s.i size={18} />{s.l}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="gallery" className="gal" aria-labelledby="gal-h">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Gallery</p>
              <h2 id="gal-h">Around the lane</h2>
              <p className="body">Tap any photo to enlarge it. All photographs are illustrative of the concept.</p>
            </div>
            <ul className="gal-grid">
              {GALLERY.map((g, i) => (
                <li key={g.name} className={`gi gi-${i + 1}`}>
                  <button type="button" onClick={() => setLb(i)} aria-label={`Open photo ${i + 1} of ${GALLERY.length}: ${g.cap}`}>
                    <Pic name={g.name} alt="" sizes="(min-width: 1024px) 33vw, 50vw" />
                    <span className="gal-cap">{g.cap}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Lightbox shots={GALLERY} index={lb} onIndex={setLb} label="Photo gallery" />

        <section id="location" className="loc wrap" aria-labelledby="loc-h">
          <div>
            <p className="eyebrow">Location</p>
            <h2 id="loc-h">Heritage streets on your doorstep</h2>
            <p className="body">Terra Lane is imagined in one of Singapore&rsquo;s historic shophouse districts. The address is a sample for this demonstration; a real property would list verified walking times.</p>
            <ul className="near">
              <li><span>Hawker centre</span><span>sample: 3 min walk</span></li>
              <li><span>MRT station</span><span>sample: 6 min walk</span></li>
              <li><span>Heritage museums</span><span>sample: 10 min walk</span></li>
            </ul>
            <p className="loc-addr"><IcPin size={20} /><span><strong>Sample address</strong><br />Heritage district, Singapore (demonstration only)</span></p>
          </div>
          <div className="map" role="img" aria-label="Map placeholder for a sample location in a heritage district of Singapore">
            <MapPlaceholder label="Map placeholder" colors={{ land: '#ebe5da', water: '#c8d3c9', road: '#faf7f1', park: '#c3cdaf', pin: '#b4532a' }} />
            <div className="map-card"><IcPin size={20} /><span><strong>Map placeholder</strong>Sample location</span></div>
          </div>
        </section>

        <section className="trust" aria-labelledby="trust-h">
          <div className="wrap">
            <p className="eyebrow">Guest voices</p>
            <h2 id="trust-h">What people might say</h2>
            <div className="quotes">
              {[
                { q: 'We ate our way down the street every morning. The room was quiet, the bed was great, and the team’s food map was gold.', w: 'Sample guest · couple, 3 nights' },
                { q: 'Perfect for a work trip: good desk, fast Wi-Fi and the MRT a few minutes away.', w: 'Sample guest · business traveller' },
                { q: 'The loft felt like our own shophouse. Our questions on WhatsApp were answered within minutes.', w: 'Sample guest · family of three' },
              ].map((t) => (
                <figure key={t.w}><blockquote>&ldquo;{t.q}&rdquo;</blockquote><figcaption>{t.w}</figcaption></figure>
              ))}
            </div>
            <p className="quotes-note">These testimonials are fictional samples for this concept, not real guest reviews.</p>
          </div>
        </section>

        <section className="faq wrap" aria-labelledby="faq-h">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-h">Good to know</h2>
          <div className="faq-list">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}<IcPlus size={20} /></summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        <section className="cta" aria-labelledby="cta-h">
          <div className="wrap cta-in">
            <h2 id="cta-h">Find your room on the lane.</h2>
            <a className="btn btn-cream" href={general} target="_blank" rel="noopener noreferrer"><WaIcon size={18} />Check Availability on WhatsApp</a>
          </div>
        </section>
      </main>

      <footer id="contact" className="ftr">
        <div className="wrap ftr-in">
          <div className="ftr-brand"><Wordmark light /><p>A fictional shophouse hotel concept created for demonstration. Not a real hotel; no bookings are taken.</p></div>
          <div>
            <h2 className="ftr-h">Contact</h2>
            <ul className="ftr-list">
              <li><WaIcon size={18} /><a href={general} target="_blank" rel="noopener noreferrer">WhatsApp {PHONE_DISPLAY}</a></li>
              <li><IcPhone size={18} /><a href={TEL}>{PHONE_DISPLAY}</a></li>
              <li><IcMail size={18} /><span>hello@terralane.example <small>(demo address)</small></span></li>
              <li><IcPin size={18} /><span>Sample address: heritage district, Singapore</span></li>
            </ul>
          </div>
          <div>
            <h2 className="ftr-h">Explore</h2>
            <ul className="ftr-nav">{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
        </div>
        <div className="wrap">
          <details className="credits">
            <summary>Photo credits</summary>
            <p>All photographs are illustrative, sourced from Wikimedia Commons under free licences, and do not show this fictional hotel.</p>
            <ol>
              {CREDITS.map((c) => <li key={c.name}><a href={c.page} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.artist}, {c.lic}</li>)}
            </ol>
          </details>
          <p className="copy">© 2026 Terra Lane Hotel. Fictional hotel concept for demonstration.</p>
        </div>
      </footer>

      <a className="enquire" href={general} target="_blank" rel="noopener noreferrer" aria-label="Enquire about availability on WhatsApp"><WaIcon size={20} /><span aria-hidden="true">Enquire</span></a>
    </>
  );
}

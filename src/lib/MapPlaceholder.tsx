/** Illustrative map placeholder. Not a real map: swap for an embedded map once a real address exists. */
export function MapPlaceholder({ label, colors }: { label: string; colors: { land: string; water: string; road: string; park: string; pin: string } }) {
  const c = colors;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="map-svg">
      <rect width="400" height="300" fill={c.land} />
      <path d="M0 215c60-20 110 10 170-5s110-55 230-35v125H0z" fill={c.water} />
      <path d="M40 40h90v60H40zM250 30h110v70H250z" fill={c.park} opacity=".85" />
      <g stroke={c.road} strokeLinecap="round" fill="none">
        <path d="M-10 120h420M-10 175c90-10 170 5 420-25M150-10v320M300-10c-20 90-10 160 10 320" strokeWidth="9" />
        <path d="M-10 60h420M70-10v230M220-10v215M360-10v190M-10 150h160M230 125h180" strokeWidth="4" opacity=".8" />
      </g>
      <g transform="translate(200 132)">
        <circle r="26" fill={c.pin} opacity=".18" />
        <path d="M0 8s-14-12-14-23a14 14 0 0 1 28 0C14-4 0 8 0 8Z" fill={c.pin} />
        <circle cy="-15" r="5" fill="#fff" />
      </g>
      <title>{label}</title>
    </svg>
  );
}

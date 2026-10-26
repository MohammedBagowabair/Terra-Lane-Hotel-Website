// Prerender the English page into dist/index.html, then GitHub Pages extras.
import { copyFileSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const PRELOAD = (process.env.PRELOAD_FONTS || '').split(',').filter(Boolean);
const { render } = await import(pathToFileURL('dist-ssr/entry-server.js').href);
const html = readFileSync('dist/index.html', 'utf8').replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
// Preload the latin display/body fonts so the hero headline paints in its real face quickly.
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const fonts = readdirSync('dist/assets').filter((f) => /-latin-(wght|standard)-(normal|italic)-.*\.woff2$/.test(f) && !/latin-ext/.test(f) && PRELOAD.some((p) => f.startsWith(p)));
const links = fonts.map((f) => `<link rel="preload" as="font" type="font/woff2" href="${base}assets/${f}" crossorigin />`).join('\n    ');
writeFileSync('dist/index.html', html.replace('</title>', `</title>\n    ${links}`));
rmSync('dist-ssr', { recursive: true, force: true });
copyFileSync('dist/index.html', 'dist/404.html');
writeFileSync('dist/.nojekyll', '');

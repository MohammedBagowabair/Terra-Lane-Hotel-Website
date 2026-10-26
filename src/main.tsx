import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource-variable/inter/wght.css';
import './lb.css';
import './index.css';
import App from './App';

hydrateRoot(document.getElementById('root')!, <StrictMode><App /></StrictMode>);

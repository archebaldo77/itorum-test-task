// libraries;
import { createRoot } from 'react-dom/client';

// components;
import { App } from './components/app/app';

// styles;
import './style.scss';

const root = createRoot(document.getElementById(`root`) as HTMLDivElement);
root.render(<App />);

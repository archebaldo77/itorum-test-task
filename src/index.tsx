// libraries;
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// components;
import { App } from './components/app/app';

// store;
import { store } from './store/store';

// styles;
import './style.scss';

const root = createRoot(document.getElementById(`root`) as HTMLDivElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

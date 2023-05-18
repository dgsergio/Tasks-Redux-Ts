import ReactDOM from 'react-dom/client';
import App from './components/App';
import './global.css';
import { store } from './store/index';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

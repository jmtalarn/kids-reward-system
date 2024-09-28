
import PWABadge from './PWABadge.tsx';
import { Router } from './adapters/ui/routing/router';
import store from "./adapters/state/store.ts";
import { Provider } from "react-redux";
import { IntlProvider } from 'react-intl';


import './App.css';

function App() {
  return (
    <IntlProvider messages={{}} locale="en" defaultLocale="en">
      <Provider store={store}>
        <Router />
        <PWABadge />
      </Provider>
    </IntlProvider>
  );
}

export default App;

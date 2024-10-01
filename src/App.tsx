
import PWABadge from './PWABadge.tsx';
import { Router } from './adapters/ui/routing/router';
import store from "./adapters/state/store.ts";
import { Provider } from "react-redux";
import IntlProviderState from './adapters/state/IntlProvider.tsx';


import './App.css';


function App() {
  return (
    <Provider store={store}>
      <IntlProviderState>
        <Router />
        <PWABadge />
      </IntlProviderState>
    </Provider>
  );
}

export default App;

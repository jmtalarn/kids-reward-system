
import PWABadge from './PWABadge.tsx';
import { Router } from './adapters/ui/routing/router';
import store from "./adapters/state/store.ts";
import { Provider } from "react-redux";
import { IntlProvider, type MessageFormatElement } from 'react-intl';
import messages_en from './lang/en.json';

// const messages: Record<string, MessageFormatElement[]> = messages_en;

import './App.css';


function App() {
  return (
    <IntlProvider messages={messages_en} locale="en" defaultLocale="en">
      <Provider store={store}>
        <Router />
        <PWABadge />
      </Provider>
    </IntlProvider>
  );
}

export default App;

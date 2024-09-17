
import PWABadge from './PWABadge.tsx';
import { Router } from './adapters/ui/routing/router';
import store from "./adapters/state/store.ts";
import { Provider } from "react-redux";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router />
      <PWABadge />
    </Provider>
  );
}

export default App;

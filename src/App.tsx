//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import appLogo from '/favicon.svg'

import { ConfigProvider } from './adapters/ui/context/ConfigContext';
import PWABadge from './PWABadge.tsx';
import { Router } from './adapters/ui/routing/router';
import './App.css';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <ConfigProvider>
      <h1>kids-reward-system</h1>
      <Router />
      <PWABadge />
    </ConfigProvider>
  );
}

export default App;

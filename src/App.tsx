import React from 'react';
import { Outlet } from 'react-router-dom';
import RoutesApp from './components/rootes';
import Navigation from './components/navigation/navigation';

function App() {
  return (
    <div className="wrapper">
      <header className="header">
        <Navigation />
      </header>
      <main className="main">
        <Outlet />
        <RoutesApp />
      </main>
    </div>
  );
}

export default App;

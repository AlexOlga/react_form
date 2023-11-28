import React from 'react';
import { Outlet } from 'react-router-dom';
import RoutesApp from './components/rootes';
import Navigation from './components/navigation/navigation';
import { useAppSelector } from './store/hooks';

function App() {
  // store
  const data = useAppSelector((state) => state.data.data);
  console.log('data', data);

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

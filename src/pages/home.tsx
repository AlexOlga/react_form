import React from 'react';
import { useAppSelector } from '../store/hooks';
import Card from '../components/cards/card';
import './homme.css';

function Home() {
  const { data } = useAppSelector((state) => state.data);
  console.log('data', data);
  return (
    <div className="cards-wrapper">
      {data.length !== 0 && data.map((item, i) => <Card key={i} user={item} />)}
    </div>
  );
}

export default Home;

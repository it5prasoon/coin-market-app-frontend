import React from 'react';
import io from 'socket.io-client';
import PriceTable from './components/App/PriceTable';

const socket = io('http://localhost:8000');

const App = () => {
  return (
      <div>
        <h1 className="center">Coin Market Price Listing</h1>
        <PriceTable socket={socket} />
      </div>
  );
};

export default App;

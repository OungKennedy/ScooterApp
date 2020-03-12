import React from 'react';
import './App.css';
import Scooter from './components/Scooter';
function App() {
  return (
    <div className="App">
      <h1>ScooterSearch</h1>
      <div id = "homepage">
        <h1>Find a scooter in your area</h1>
        <div id="scooters"></div>
        <Scooter/>
      </div>
    </div>
  );
}

export default App;

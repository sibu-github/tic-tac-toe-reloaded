import React from 'react';
import './App.css';
import Game from './Game';

export const CELL_VALUE = 'X';

export const getRandom = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends React.Component {
  render() {
    return <Game />;
  }
}

export default App;

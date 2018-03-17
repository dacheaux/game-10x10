import React, { Component } from 'react';

import Row from './components/Row';
import MainMenu from './components/MainMenu';
import GameStats from './components/GameStats';
import './App.css';

class App extends Component {
  render() {
    const Rows = [];
    for (let i = 1; i <= 10; i++) {
      Rows.push(<Row rowNum={i} key={i} />);
    }

    return (
      <div className="container-fluid">
        <MainMenu />
        <div className="App row">
          <div className="main">{Rows}</div>
          <div className="info">Here be charts</div>
        </div>
        <GameStats />
      </div>
    );
  }
}

export default App;

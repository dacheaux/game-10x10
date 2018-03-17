import React, { Component } from 'react';

import Menu from './components/Menu';
import Rows from './components/Rows';
import GameStats from './components/GameStats';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7">
            <Menu />
            <Rows />
            <GameStats />
          </div>
          <div className="col-md-5 info">Here be charts</div>
        </div>
      </div>
    );
  }
}

export default App;

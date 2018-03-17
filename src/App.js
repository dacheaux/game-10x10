import React, { Component } from 'react';

import Menu from './components/Menu';
import Rows from './components/Rows';
import GameStats from './components/GameStats';
import Charts from './components/Charts';
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
          <div className="col-md-5 info">
            <Charts />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

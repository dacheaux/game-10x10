import React, { Component } from 'react';

import Row from './components/Row';
import MainMenu from './components/MainMenu';
import './App.css';

class App extends Component {
  render() {
    const Rows = [];
    for (let i = 1; i <= 10; i++) {
      Rows.push(<Row rowNum={i} key={i} />);
    }

    return (
      <div className="container-fluid">
        <div className="App row">
          <div className="main">{Rows}</div>
          <div className="info"><MainMenu /></div>
        </div>
      </div>
    );
  }
}

export default App;

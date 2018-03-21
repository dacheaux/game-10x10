import React, { Component } from 'react';

import Menu from './components/Menu';
import Rows from './components/Rows';
import GameStats from './components/GameStats';
import Charts from './components/charts/Charts';
import './App.css';

class App extends Component {
  state = { topScores: false }

  onShowTopScores = () => {
    this.setState(prevState => {
      return { topScores: !prevState.topScores }
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Menu />
            <Rows />
            <GameStats />
          </div>
          <div className="col-md-6 info mt-5">
            <div className="row d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-primary float-right"
                onClick={this.onShowTopScores}
              >
                Show top scores
              </button>
            </div>
            <Charts show={this.state.topScores}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from './components/Menu';
import Rows from './components/Rows';
import GameStats from './components/GameStats';
import Charts from './components/charts/Charts';
import './App.css';

class App extends Component {
  state = { topScores: false };

  onShowTopScores = () => {
    this.setState(prevState => {
      return { topScores: !prevState.topScores };
    });
  };

  render() {
    const { player } = this.props.gameProps;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Menu />
            <Rows />
            <GameStats />
          </div>
          <div className="col-md-6 info mt-3">
            <div className="w-100 p-0 d-flex justify-content-between">
              <div className="p-0">
                Hello, <span className="text-info">{player.name}</span>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={this.onShowTopScores}
              >
                Show top scores
              </button>
            </div>
            <Charts show={this.state.topScores} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps }) {
  return { gameProps };
}

export default connect(mapStateToProps)(App);

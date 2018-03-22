import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Menu from './components/Menu';
import Rows from './components/Rows';
import GameStats from './components/GameStats';
import Charts from './components/charts/Charts';
import LevelEnd from './components/modals/LevelEnd';
import * as actions from './actions';
import './App.css';

class App extends Component {
  state = { topScores: false };

  onShowTopScores = () => {
    this.setState(prevState => {
      return { topScores: !prevState.topScores };
    });
  };

  componentWillReceiveProps(nextProps) {
    const { levelStarted, levelCompleted, level } = this.props.gameProps;
    const next = nextProps.gameProps;
    if (next.levelCompleted && next.levelCompleted !== levelCompleted)
      return this.props.setModal(true, level);
    if (!next.levelStarted && next.levelStarted !== levelStarted)
      this.props.setModal(false, level);
  }

  onYesOrNo = isYes => {
    let { level, levelCompleted } = this.props.gameProps;
    if (isYes) return this.props.nextLevel(levelCompleted ? ++level : level);
    return this.props.startGame(false);
  };

  render() {
    const { player, isModalOpen, modalHeading, modalText, isChoosePlayerOpen } = this.props.gameProps;
    const infoClass = classNames({ "col-md-6 info mt-3": true, "low-z-index": isChoosePlayerOpen })
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Menu />
            <Rows />
            <GameStats />
          </div>
          <div className={infoClass}>
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
          <LevelEnd show={isModalOpen} yesOrNo={this.onYesOrNo}>
            <h3>{modalHeading}</h3>
            <p>{modalText}</p>
          </LevelEnd>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps }) {
  return { gameProps };
}

export default connect(mapStateToProps, actions)(App);

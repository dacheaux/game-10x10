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
  state = { showTopScores: false };

  componentWillReceiveProps(nextProps) {
    const {
      levelStarted,
      levelCompleted,
      level,
      isChoosePlayerOpen
    } = this.props.gameProps;
    const next = nextProps.gameProps;
    if (next.levelCompleted && next.levelCompleted !== levelCompleted)
      return this.props.setModal(true, level);
    if (
      !next.levelStarted &&
      next.levelStarted !== levelStarted &&
      !isChoosePlayerOpen
    )
      this.props.setModal(false, level);
  }

  onShowTopScores = () => {
    this.setState(prevState => {
      return { showTopScores: !prevState.showTopScores };
    });
  };

  onYesOrNo = isYes => {
    let { level, levelCompleted } = this.props.gameProps;
    if (isYes) return this.props.nextLevel(levelCompleted ? ++level : level);
    return this.props.startGame(false);
  };

  render() {
    const {
      levelReady,
      isEndLevelModalOpen,
      modalHeading,
      modalText,
      isChoosePlayerOpen
    } = this.props.gameProps;
    const mainClass = classNames({
      'col-md-6': true,
      'low-z-index': isChoosePlayerOpen
    });
    const infoClass = classNames({
      'col-md-6 info mt-3': true,
      'low-z-index': isChoosePlayerOpen
    });
    const gameInfo =
      levelReady && !this.state.showTopScores ? (
        <span className="text-danger">Click on a square to begin</span>
      ) : (
        ''
      );
    return (
      <div className="container-fluid">
        <div className="row">
          <Menu showTopScores={this.onShowTopScores} />
          <div className={mainClass}>
            <Rows />
            <GameStats />
          </div>
          <div className={infoClass}>
            {gameInfo}
            <Charts show={this.state.showTopScores} />
          </div>
          <LevelEnd show={isEndLevelModalOpen} yesOrNo={this.onYesOrNo}>
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

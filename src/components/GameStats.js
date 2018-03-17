import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class GameStats extends Component {
  componentWillReceiveProps(nextProps) {
    const { level, timesCompleted } = this.props.gameProps;
    if (
      nextProps.gameLogic.timer &&
      nextProps.gameLogic.timer !== this.props.gameLogic.timer
    ) {
      this.setState({ elapsedTime: 0 });
      this.interval = setInterval(this.tick, 1000);
    } else if (!nextProps.gameLogic.timer) {
      clearInterval(this.interval);
      this.saveUserScore(this.state.elapsedTime);
    }
  }

  saveUserScore = (elapsedTime) => {
    console.log('elapsedTime', elapsedTime);
    const players = this.props.gameProps.users;
  }

  state = { elapsedTime: 0 };

  tick = () => {
    this.setState(prevState => {
      return { elapsedTime: ++prevState.elapsedTime };
    });
  };

  render() {
    const { levelSquares, checkedSquares, timer } = this.props.gameLogic;
    const { gameProps } = this.props;
    return (
      <div className="row menu">
        <h6 className="col-3">Elapsed time: {this.state.elapsedTime}</h6>
        <h6 className="col-3">
          Fields left to click: {levelSquares.length - checkedSquares.length}
        </h6>
        <h6 className="col-3">Level: {gameProps.level}</h6>
        <h6 className="col-3">Number of lives: {gameProps.player.lives}</h6>
      </div>
    );
  }
}

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default connect(mapStateToProps, actions)(GameStats)

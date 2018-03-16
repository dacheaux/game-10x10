import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class GameStats extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
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
    return (
      <div>
        Info:
        <h4>Elapsed time: {this.state.elapsedTime}</h4>
        <h4>
          Fields left to click: {levelSquares.length - checkedSquares.length}
        </h4>
        <h4>Level: {this.props.gameProps.level}</h4>
        <h4>Number of lives: {this.props.gameProps.lives}</h4>
      </div>
    );
  }
}

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default connect(mapStateToProps, actions)(GameStats)

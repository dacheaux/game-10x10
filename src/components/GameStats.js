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

  saveUserScore = elapsedTime => {
    const players = this.props.gameProps.users;
  };

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
        <h5 className="col-auto text-danger">Game Stats</h5>
        <div className="col-9 row">
          <h6 className="col-3">Timer: {this.state.elapsedTime}</h6>
          <h6 className="col-3">
            Left to click: {levelSquares.length - checkedSquares.length}
          </h6>
          <h6 className="col-3">Lives: {gameProps.player.lives}</h6>
          <h6 className="col-3">Level: {gameProps.level}</h6>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default connect(mapStateToProps, actions)(GameStats);

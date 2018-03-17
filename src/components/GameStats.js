import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class GameStats extends Component {
  componentWillReceiveProps(nextProps) {
    const { levelStarted, levelCompleted } = this.props.gameProps;
    const next = nextProps.gameProps;
    if (next.levelStarted && next.levelStarted !== levelStarted) {
      this.setState({ elapsedTime: 0 });
      this.interval = setInterval(this.tick, 1000);
    } 
    if (next.levelCompleted && next.levelCompleted !== levelCompleted) {
      clearInterval(this.interval);
      this.savePlayerScore(this.state.elapsedTime);
    }
  }

  savePlayerScore = time => {
    const { level, topScores } = this.props.gameProps;
    let levelScores = topScores[`level${level}`];
    if (!levelScores) {
      levelScores = { topTime: time, allTimes: [time] };
      topScores[`level${level}`] = levelScores;
    } else {
      levelScores.allTimes.push(time);
      if (time < levelScores.topTime) levelScores.topTime = time;
    }
    console.log('topScores', topScores);
    // this.props.saveScores(topScores);
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

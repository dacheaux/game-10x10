import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import saveScores from '../utils/saveScores'

class GameStats extends Component {
  state = { timer: 0 };

  componentWillReceiveProps(nextProps) {
    const { levelStarted, levelCompleted, levelReady } = this.props.gameProps;
    const next = nextProps.gameProps;
    if (next.levelStarted && next.levelStarted !== levelStarted) {
      this.tickInterval = setInterval(this.tick, 1000);
    }
    if (next.levelCompleted && next.levelCompleted !== levelCompleted) {
      clearInterval(this.tickInterval);
      saveScores(this.state.timer, nextProps.gameLogic.times);
    } else if (!next.levelStarted && next.levelStarted !== levelStarted) {
      clearInterval(this.tickInterval);
      saveScores(null);
    }
    if (next.levelReady && next.levelReady !== levelReady)
      this.setState({ timer: 0 });
  }

  tick = () => {
    this.setState(prevState => {
      return { timer: ++prevState.timer };
    });
  };

  render() {
    const { levelSquares, checkedSquares } = this.props.gameLogic;
    const { gameProps } = this.props;
    return (
      <div className="d-flex menu">
        <h5 className="col-auto p-0 mr-4 text-danger">Game Stats</h5>
        <div className="w-100 p-0 d-flex justify-content-between">
          <h6 className="">
            Timer: <b>{Math.round(this.state.timer)}</b>
          </h6>
          <h6 className="">
            Left to click: <b>{levelSquares.length - checkedSquares.length}</b>
          </h6>
          <h6 className="">
            Lives: <b>{gameProps.player.lives}</b>
          </h6>
          <h6 className="">
            Level: <b>{gameProps.level}</b>
          </h6>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default connect(mapStateToProps, actions)(GameStats);

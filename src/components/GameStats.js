import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

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
      this.saveScores(this.state.timer, nextProps.gameLogic.times);
    } else if (!next.levelStarted && next.levelStarted !== levelStarted) {
      clearInterval(this.tickInterval);
      this.saveScores(null);
    }
    if (next.levelReady && next.levelReady !== levelReady)
      this.setState({ timer: 0 });
  }

  tick = () => {
    this.setState(prevState => {
      return { timer: ++prevState.timer };
    });
  };

  saveScores = (time, times) => {
    const { level, player, players } = this.props.gameProps;
    const { levelSquares, checkedSquares } = this.props.gameLogic;
    const timeChart = times.map(
      (e, i, arr) => Math.round((e - arr[0]) / 1000)
    );
    timeChart.splice(0, 1);
    const { scores } = player;

    const newPlayers = players.filter(item => item.name !== player.name);
    if (time !== null) {
      let levelScores = scores[`level${level}`];
      if (!levelScores) {
        levelScores = {
          timesCompleted: 1,
          topTime: time,
          allTimes: [time],
          topTimeChart: timeChart
        };
      } else {
        ++levelScores.timesCompleted;
        if (levelScores.allTimes) {
          levelScores.allTimes.push(time);
        } else {
          levelScores.allTimes = [time];
        }
        if (time < levelScores.topTime || !levelScores.topTime) {
          levelScores.topTime = time;
          levelScores.topTimeChart = timeChart;
        }
      }
      if (level >= player.level) ++player.level;
      ++player.lives;
      newPlayers.push(player);
      this.props.onWinOrLose(player, newPlayers);
      player.scores[`level${level}`] = levelScores;
    } else {
      player.lives =
        player.lives - (levelSquares.length - checkedSquares.length);
      if (player.lives < 0) player.lives = 0;
      newPlayers.push(player);
      this.props.onWinOrLose(player, newPlayers);
    }
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('players', JSON.stringify(newPlayers));
  };

  render() {
    const { levelSquares, checkedSquares, timer } = this.props.gameLogic;
    const { gameProps } = this.props;
    return (
      <div className="row menu">
        <h5 className="col-auto text-danger">Game Stats</h5>
        <div className="col-9 row">
          <h6 className="col-3">Timer: {Math.round(this.state.timer)}</h6>
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

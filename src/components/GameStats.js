import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class GameStats extends Component {
  state = { timer: 0, betweenClicks: 0, times: [] };

  componentWillReceiveProps(nextProps) {
    const {
      levelStarted,
      levelCompleted,
      levelReady,
      scoreChart
    } = this.props.gameProps;
    const { checkedSquares } = this.props.gameLogic;
    const next = nextProps.gameProps;
    if (next.levelStarted && next.levelStarted !== levelStarted) {
      this.setState({ betweenClicks: 0 });
      this.tickInterval = setInterval(this.tick, 500);
      this.tockInterval = setInterval(this.tock, 500);
    }
    if (nextProps.gameLogic.checkedSquares.length !== checkedSquares.length && checkedSquares.length !== 0) {
      clearInterval(this.tickInterval);
      this.setState(prevState => {
        prevState.times.push(Math.round(this.state.betweenClicks / 2));
        return {
          times: prevState.times,
          betweenClicks: 0
        };
      });
      this.tickInterval = setInterval(this.tick, 500);
    }
    if (next.levelCompleted && next.levelCompleted !== levelCompleted) {
      clearInterval(this.tickInterval);
      clearInterval(this.tockInterval);
      this.saveScores(Math.round(this.state.timer / 2), this.state.times);
    } else if (!next.levelStarted && next.levelStarted !== levelStarted) {
      clearInterval(this.tickInterval);
      clearInterval(this.tockInterval);
      this.saveScores(null);
    }
    if (next.levelReady && next.levelReady !== levelReady)
      this.setState({ timer: 0, betweenClicks: 0, times: [] });
  }

  tick = () => {
    this.setState(prevState => {
      return { betweenClicks: ++prevState.betweenClicks };
    });
  };

  tock = () => {
    this.setState(prevState => {
      return { timer: ++prevState.timer };
    });
  };

  // // if (squareChecked) {
  //   times.push(); clearInterval; if (!levelCompleted) setInterval();
  // }

  saveScores = (time, times) => {
    console.log(time, times);
    const { level, player, players } = this.props.gameProps;
    const { levelSquares, checkedSquares } = this.props.gameLogic;
    const { scores } = player;

    const newPlayers = players.filter(item => item.name !== player.name);
    if (time !== null) {
      let levelScores = scores[`level${level}`];
      if (!levelScores) {
        levelScores = {
          timesCompleted: 1,
          topTime: time,
          allTimes: [time],
          topTimeChart: times
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
          levelScores.topTimeChart = times;
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

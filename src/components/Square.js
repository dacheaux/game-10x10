import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import LevelEnd from './modals/LevelEnd';

import * as actions from '../actions';
import * as utils from '../utils';

class Square extends Component {
  state = {
    isModalOpen: false,
    modalText: '',
    modalHeading: ''
  };

  toggleEndLevel = (isWin, uncheckedSquares) => {
    const { player, players, level } = this.props.gameProps;
    this.setState(prevState => {
      const modalHeading = isWin
        ? `You have completed level: ${level}`
        : 'End game';
      const modalText = isWin
        ? 'Do you want to play another level?'
        : 'You have lost this level. Do you want to try again?';
      return { isModalOpen: !prevState.isModalOpen, modalText, modalHeading };
    });
    // if (this.props.level === 99) {
    // }
    const newPlayers = players.filter(item => item.name !== player.name);
    if (isWin) {
      const { scores } = player;
      if (!scores[`level${player.level}`]) {
        scores[`level${player.level}`] = {
          timesCompleted: 0,
          bestTime: 0,
          allTimes: []
        };
      }
      ++scores[`level${player.level}`].timesCompleted;
      if (level > player.level) ++player.level;
      ++player.lives;
      newPlayers.push(player);
      this.props.onWin(level, player, newPlayers);
    } else {
      player.lives = player.lives - uncheckedSquares;
      if (player.lives < 0) player.lives = 0;
      newPlayers.push(player);
      this.props.onLose(level, player, newPlayers);
    }
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('players', JSON.stringify(newPlayers));
  };

  onYesOrNo = isYes => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
    if (isYes) return this.props.nextLevel(++this.props.gameProps.level);
    return this.props.startGame(false);
  };

  onSquareClick = e => {
    const { coords: square, checkSquare } = this.props;
    const { levelSquares, litSquares, checkedSquares } = this.props.gameLogic;
    if (!utils.isContainedIn(levelSquares, square)) return;
    if (utils.isContainedIn(litSquares, square)) {
      const res = checkSquare(square, levelSquares, checkedSquares);
      if (!res.litSquares.length) {
        const uncheckedSquares =
          levelSquares.length - res.checkedSquares.length;
        if (uncheckedSquares) {
          return this.toggleEndLevel(false, uncheckedSquares);
        }
        return this.toggleEndLevel(true, uncheckedSquares);
      }
    }
  };

  render() {
    const { generateLevelSquares, coords: square } = this.props;
    const { checkedSquares, litSquares, levelSquares } = this.props.gameLogic;
    const { player, level, start } = this.props.gameProps;

    const checked = utils.isContainedIn(checkedSquares, square);
    const lit = utils.isContainedIn(litSquares, square);
    const unchecked =
      utils.isContainedIn(levelSquares, square) && !checked && !lit;
    const active = start;
    const squareClass = classNames({
      square: true,
      active,
      unchecked,
      lit,
      checked
    });
    const onSquareClick =
      start && !levelSquares.length
        ? () => generateLevelSquares(square, level)
        : this.onSquareClick;
    return (
      <div className="squareHolder">
        <div className={squareClass} onClick={onSquareClick} />
        <LevelEnd show={this.state.isModalOpen} yesOrNo={this.onYesOrNo}>
          <h3>{this.state.modalHeading}</h3>
          <p>{this.state.modalText}</p>
        </LevelEnd>
      </div>
    );
  }
}

function mapStateToProps({ gameLogic, gameProps }) {
  return { gameLogic, gameProps };
}

export default connect(mapStateToProps, actions)(Square);

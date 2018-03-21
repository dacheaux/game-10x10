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
    modalHeading: '',
    isWin: false
  };

  endLevel = isWin => {
    this.props.levelEnd(isWin);
    const { level } = this.props.gameProps;
    this.setState(prevState => {
      let modalHeading = isWin
        ? `You have completed level: ${this.props.gameProps.level}`
        : 'End game';
      let modalText = isWin
        ? 'Do you want to play another level?'
        : 'You have lost this level. Do you want to try again?';
      if (level === 99 && isWin) {
        modalHeading = 'Congratulations, you have finished the game!';
        modalText = 'Do you want to play from the beginning?';
      }
      return { isModalOpen: !prevState.isModalOpen, modalText, modalHeading, isWin };
    });
  };

  onYesOrNo = isYes => {
    let { level } = this.props.gameProps;
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
    if (isYes) return this.props.nextLevel(this.state.isWin ? ++level : level);
    return this.props.startGame(false);
  };

  onSquareClick = e => {
    const { coords: square, checkSquare } = this.props;
    const { levelSquares, litSquares, checkedSquares } = this.props.gameLogic;
    if (!utils.isContainedIn(levelSquares, square)) return;
    if (utils.isContainedIn(litSquares, square)) {
      const timeStamp = new Date();
      const res = checkSquare(square, levelSquares, JSON.parse(JSON.stringify(checkedSquares)), timeStamp);
      if (!res.litSquares.length) {
        const uncheckedSquares =
          levelSquares.length - res.checkedSquares.length;
        if (uncheckedSquares) {
          return this.endLevel(false);
        }
        return this.endLevel(true);
      }
    }
  };

  render() {
    const { generateLevelSquares, coords: square } = this.props;
    const { checkedSquares, litSquares, levelSquares } = this.props.gameLogic;
    const { player, level, levelReady } = this.props.gameProps;

    const checked = utils.isContainedIn(checkedSquares, square);
    const lit = utils.isContainedIn(litSquares, square);
    const unchecked =
      utils.isContainedIn(levelSquares, square) && !checked && !lit;
    const active = levelReady;
    const squareClass = classNames({
      square: true,
      active,
      unchecked,
      lit,
      checked
    });
    const onSquareClick =
      levelReady && !levelSquares.length
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

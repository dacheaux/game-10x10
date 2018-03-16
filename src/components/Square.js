import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../actions';
import * as utils from '../utils';

import Modal from './Modal';

class Square extends Component {
  state = {
    isModalOpen: false,
    modalText: '',
    modalHeading: ''
  };

  toggleEndLevel = (player, isWin, uncheckedSquares) => {
    if (this.props.level === 99) {
      // this.setState()
    }
    const { players } = this.props;
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
      ++player.level;
      ++player.lives;
      newPlayers.push(player);
      this.props.onWin(player, newPlayers);
    } else {
      player.lives = player.lives - uncheckedSquares;
      if (player.lives < 0) player.lives = 0;
      newPlayers.push(player);
      this.props.onLose(player, newPlayers);
    }
    localStorage.setItem('player', JSON.stringify(player));
    localStorage.setItem('players', JSON.stringify(newPlayers));
    this.setState(prevState => {
      const modalText = isWin
        ? 'Do you want to play another level'
        : 'You have lost this level. Do you want to try again?';
      const modalHeading = isWin
        ? `You have completed level: ${this.props.player.level}`
        : 'End game';
      return { isModalOpen: !prevState.isModalOpen, modalText, modalHeading };
    });
  };

  onYesOrNo = isYes => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
    if (isYes) return this.props.nextLevel();
    return this.props.startGame(false);
  };

  onSquareClick = e => {
    const {
      levelSquares,
      litSquares,
      checkedSquares,
      coords: square,
      player
    } = this.props;
    if (!utils.isContainedIn(levelSquares, square)) return;
    if (utils.isContainedIn(litSquares, square)) {
      let res = this.props.genLinkedSquares(
        square,
        levelSquares,
        checkedSquares
      );
      if (!res.linkedSquares.length) {
        console.log('!res.linkedSquares');
        const uncheckedSquares = levelSquares.length - res.checked.length;
        if (uncheckedSquares) {
          return this.toggleEndLevel(player, false, uncheckedSquares);
        }
        return this.toggleEndLevel(player, true, uncheckedSquares);
      }
    } else {
      return;
    }
  };

  render() {
    const {
      coords: square,
      checkedSquares,
      litSquares,
      levelSquares,
      mainMenu,
      player,
      generateLevelSquares
    } = this.props;
    const checked = utils.isContainedIn(checkedSquares, square);
    const lit = utils.isContainedIn(litSquares, square);
    const unchecked =
      utils.isContainedIn(levelSquares, square) && !checked && !lit;
    const active = !mainMenu;
    const squareClass = classNames({
      square: true,
      active,
      unchecked,
      lit,
      checked
    });
    // console.log(this.props.lit);
    const onSquareClick =
      !mainMenu && !levelSquares.length
        ? () => generateLevelSquares(this.props.coords, player.level)
        : this.onSquareClick;
    return (
      <div className="squareHolder">
        <div className={squareClass} onClick={onSquareClick} />
        <Modal show={this.state.isModalOpen} yesOrNo={this.onYesOrNo}>
          <h3>{this.state.modalHeading}</h3>
          <p>{this.state.modalText}</p>
          <div style={{ padding: '1%' }}>
            <form>
              Choose level (between 1 and 99):
              <input
                type="number"
                name="quantity"
                min="1"
                max="99"
                value={this.state.chosenLevel}
              />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({
  gameLogic: { levelSquares, checkedSquares, litSquares },
  gameProps: { player, players, mainMenu }
}) {
  return { player, players, mainMenu, levelSquares, checkedSquares, litSquares };
}

export default connect(mapStateToProps, actions)(Square);

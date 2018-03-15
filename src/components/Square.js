import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../actions';
import * as utils from '../utils';

import Modal from './Modal';

class Square extends Component {
  componentDidMount() {
    // console.log(this.props.coords);
  }

  componentDidUpdate() {}

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');
  }

  state = {
    isModalOpen: false,
    modalText: '',
    modalHeading: ''
  };

  toggleModal = (isWin, uncheckedSquares) => {
    if (this.props.level === 99) {
      // this.setState()
    }
    if (isWin) {this.props.onWin();}
    else {this.props.onLose(uncheckedSquares);}
    this.setState(prevState => {
      const modalText = isWin
        ? 'Do you want to play another level'
        : 'You have lost this level. Do you want to try again?';
      const modalHeading = isWin
        ? `You have completed level: ${this.props.level}`
        : 'End game';
      return { isModalOpen: !prevState.isModalOpen, modalText, modalHeading };
    });
  };

  onYesOrNo = isYes => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
    if (isYes) return this.props.nextLevel();
    return this.props.showMainMenu(true);
  };

  generateLevelSquares = () => {
    this.props.generateLevelSquares(this.props.coords);
    console.log('generateLevelSquares');
  };

  onSquareClick = e => {
    const {
      levelSquares,
      litSquares,
      checkedSquares,
      coords: square
    } = this.props;
    if (!utils.isContainedIn(levelSquares, square)) return;
    if (utils.isContainedIn(litSquares, square)) {
      let res = this.props.genLinkedSquares(
        square,
        levelSquares,
        checkedSquares
      );
      console.log('res', res);
      if (!res.linkedSquares.length) {
        console.log('!res.linkedSquares');
        const uncheckedSquares = levelSquares.length - res.checked.length;
        if (uncheckedSquares) {
          return this.toggleModal(false, uncheckedSquares);
        }
        return this.toggleModal(true, uncheckedSquares);
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
      mainMenu
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
        ? this.generateLevelSquares
        : this.onSquareClick;
    return (
      <div className="squareHolder">
        <div className={squareClass} onClick={onSquareClick} />
        <Modal show={this.state.isModalOpen} onBtnClick={this.onYesOrNo}>
          <h3>{this.state.modalHeading}</h3>
          <p>{this.state.modalText}</p>
          <div style={{padding: '1%'}}>
          <form>
            Choose level (between 1 and 99):
            <input type="number" name="quantity" min="1" max="99" value={this.state.chosenLevel} />
          </form>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({
  gameLogic: { levelSquares, checkedSquares, litSquares },
  gameProps: { mainMenu, level }
}) {
  return { levelSquares, checkedSquares, litSquares, mainMenu, level };
}

export default connect(mapStateToProps, actions)(Square);

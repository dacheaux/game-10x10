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
    isOpen: false,
    modalText: '',
    modalHeading: ''
  };

  toggleModal = (isWin, level) => {
    console.log(level);
    this.setState(prevState => {
      const modalText = isWin
        ? 'Do you want to play another level'
        : 'You have lost this level. Do you want to try again?';
      const modalHeading = isWin
        ? `You have completed level: ${level}`
        : 'End game';
      return { isOpen: !prevState.isOpen, modalText, modalHeading };
    });
    if (isWin) return this.props.onWin();
    return this.props.onLose();
  };

  onYesOrNo = isYes => {
    this.setState(prevState => {return { isOpen: !prevState.isOpen }});
    if (isYes) return this.props.nextLevel();
    return this.props.showMainMenu(true);   
  };

  generateGameSquares = () => {
    this.props.generateGameSquares(this.props.coords);
    console.log('generateGameSquares');
  };

  onSquareClick = e => {
    const { activeSquares, litSquares, checkedSquares, coords: square } = this.props;
    if (!utils.isContained(activeSquares, square)) return;
    if (utils.isContained(litSquares, square)) {
      let res = this.props.genLinkedSquares(square, activeSquares, checkedSquares);
      console.log('res', res);
      if (!res.linkedSquares.length) {
        console.log('!res.linkedSquares');
        if (res.checked.length !== activeSquares.length) {
          return this.toggleModal(false, activeSquares.length - 1);
        }
        return this.toggleModal(true, activeSquares.length - 1);
      }
    } else {
      return;
    }
  };

  render() {
    const {coords: square, checkedSquares, litSquares, activeSquares, mainMenu} = this.props;
    const checked = utils.isContained(checkedSquares, square);
    const lit = utils.isContained(litSquares, square);
    const unchecked =
      utils.isContained(activeSquares, square) && !checked && !lit;
    const active = !mainMenu;
    const squareClass = classNames({
      square: true,
      active,
      unchecked,
      lit,
      checked
    });
    // console.log(this.props.lit);
    const onSquareClick = !mainMenu && !activeSquares.length
      ? this.generateGameSquares
      : this.onSquareClick;
    return (
      <div className="squareHolder">
        <div className={squareClass} onClick={onSquareClick} />
        <Modal show={this.state.isOpen} onBtnClick={this.onYesOrNo}>
          <h3>{this.state.modalHeading}</h3>
          <p>{this.state.modalText}</p>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ gameLogic: { activeSquares, checkedSquares, litSquares }, gameProps: { mainMenu } }) {
  return { activeSquares, checkedSquares, litSquares, mainMenu };
}

export default connect(mapStateToProps, actions)(Square);

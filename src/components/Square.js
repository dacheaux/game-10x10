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
    return this.props.toMainMenu();   
  };

  generateGameSquares = () => {
    this.props.generateGameSquares(this.props.coords);
    console.log('generateGameSquares');
  };

  onSquareClick = e => {
    const { activeSquares, lit, checked, coords } = this.props;
    if (!utils.isContained(activeSquares, coords)) return;
    if (utils.isContained(lit, coords)) {
      let res = this.props.genLinkedSquares(coords, activeSquares, checked);
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
    const square = this.props.coords;
    let checked = utils.isContained(this.props.checked, square);
    let lit = utils.isContained(this.props.lit, square);
    let unchecked =
      utils.isContained(this.props.activeSquares, square) && !checked && !lit;
    let squareClass = classNames({
      square: true,
      unchecked,
      lit,
      checked
    });
    // console.log(this.props.lit);
    let onSquareClick = !this.props.activeSquares.length
      ? this.generateGameSquares
      : this.onSquareClick;
    return (
      <div>
        <div className={squareClass} onClick={onSquareClick} />
        <Modal show={this.state.isOpen} onBtnClick={this.onYesOrNo}>
          <h3>{this.state.modalHeading}</h3>
          <p>{this.state.modalText}</p>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ gameLogic: { activeSquares, checked, lit } }) {
  // console.log(activeSquares, checked, lit);
  return { activeSquares, checked, lit };
}

export default connect(mapStateToProps, actions)(Square);

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

  toggleModal = (isWin, uncheckedSquares) => {
    if (this.props.level === 99) {
      // this.setState()
    }
    this.setState(prevState => {
      const modalText = isWin
        ? 'Do you want to play another level'
        : 'You have lost this level. Do you want to try again?';
      const modalHeading = isWin
        ? `You have completed level: ${this.props.level}`
        : 'End game';
      return { isOpen: !prevState.isOpen, modalText, modalHeading };
    });
    if (isWin) return this.props.onWin();
    return this.props.onLose(uncheckedSquares);
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
    if (!utils.isContainedIn(activeSquares, square)) return;
    if (utils.isContainedIn(litSquares, square)) {
      let res = this.props.genLinkedSquares(square, activeSquares, checkedSquares);
      console.log('res', res);
      if (!res.linkedSquares.length) {
        console.log('!res.linkedSquares');
        const uncheckedSquares = activeSquares.length - res.checked.length;
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
    const {coords: square, checkedSquares, litSquares, activeSquares, mainMenu} = this.props;
    const checked = utils.isContainedIn(checkedSquares, square);
    const lit = utils.isContainedIn(litSquares, square);
    const unchecked =
      utils.isContainedIn(activeSquares, square) && !checked && !lit;
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

function mapStateToProps({ gameLogic: { activeSquares, checkedSquares, litSquares }, gameProps: { mainMenu, level } }) {
  return { activeSquares, checkedSquares, litSquares, mainMenu, level };
}

export default connect(mapStateToProps, actions)(Square);

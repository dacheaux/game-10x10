import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as actions from '../actions';
import * as helpers from '../utils/helpers';

class Square extends Component {
  onSquareClick = e => {
    const { coords: square, checkSquare } = this.props;
    const { levelSquares, litSquares, checkedSquares } = this.props.gameLogic;
    if (!helpers.isContainedIn(levelSquares, square)) return;
    if (helpers.isContainedIn(litSquares, square)) {
      const timeStamp = new Date();
      const res = checkSquare(
        square,
        levelSquares,
        JSON.parse(JSON.stringify(checkedSquares)),
        timeStamp
      );
      if (!res.litSquares.length) {
        const uncheckedSquares =
          levelSquares.length - res.checkedSquares.length;
        if (uncheckedSquares) {
          return this.props.levelEnd(false);
        }
        this.props.levelEnd(true);
      }
    }
  };

  render() {
    const { generateLevelSquares, coords: square } = this.props;
    const { checkedSquares, litSquares, levelSquares } = this.props.gameLogic;
    const { level, levelReady } = this.props.gameProps;

    const checked = helpers.isContainedIn(checkedSquares, square);
    const lit = helpers.isContainedIn(litSquares, square);
    const unchecked =
      helpers.isContainedIn(levelSquares, square) && !checked && !lit;
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
      </div>
    );
  }
}

function mapStateToProps({ gameLogic, gameProps }) {
  return { gameLogic, gameProps };
}

export default connect(mapStateToProps, actions)(Square);

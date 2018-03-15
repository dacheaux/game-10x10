import React from 'react';

import * as actions from '../actions';
import Square from './Square';

export default props => {
  let Squares = [];

  for (let i = 1; i <= 10; i++) {
    Squares.push(<Square key={i} coords={[i, props.rowNum]} />);
  }

  return <div className="row-field">{Squares}</div>;
};

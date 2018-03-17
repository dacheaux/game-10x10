import React from 'react';

import Square from './Square';
import * as actions from '../actions';

export default props => {
  const Rows = [];
  const Row = (rowProps) => <div className="row-field">{rowProps.children}</div>;

  for (let i = 1; i <= 10; i++) {
    let Squares = [];
    for (let j = 1; j <= 10; j++) {
      Squares.push(<Square key={String(i)+String(j)} coords={[j, i]} />);
    }
    Rows.push(<Row key={i}>{Squares}</Row>);
  }

  return <div className="main my-2">{Rows}</div>;
};

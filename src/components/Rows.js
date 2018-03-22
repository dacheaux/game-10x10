import React from 'react';

import Square from './Square';

export default props => {
  const Rows = [];
  const Row = (rowProps) => <div className="d-flex">{rowProps.children}</div>;

  for (let i = 1; i <= 10; i++) {
    let Squares = [];
    for (let j = 1; j <= 10; j++) {
      Squares.push(<Square key={String(i)+String(j)} coords={[j, i]} />);
    }
    Rows.push(<Row key={i}>{Squares}</Row>);
  }

  return <div className="game-row my-2">{Rows}</div>;
};

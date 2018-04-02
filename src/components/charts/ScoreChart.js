import React, { Component } from 'react';
import { connect } from 'react-redux';

import drawChart from '../../utils/drawChart';

class ScoreChart extends Component {
  componentDidUpdate() {
    const { level, player } = this.props;
    const canvas = this.refs.canvas;
    drawChart(level, player, canvas);
  }

  render() {
    const { size, show, level, player } = this.props;
    const width = Math.round(size * 0.9),
      height = Math.round(size * 0.5);
    const className = show ? '' : 'd-none';
    const heading = player.scores[`level${level}`] ? (
      <h5 className="text-danger">
        Score Chart <small className="text-muted">(level {level})</small>
      </h5>
    ) : (
      <h5>No score chart for this level</h5>
    );
    return (
      <div className={className}>
        {heading}
        <hr className="col-10 mt-1 mb-4" />
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

function mapStateToProps({ gameProps: { player, level } }) {
  return { player, level };
}

export default connect(mapStateToProps)(ScoreChart);

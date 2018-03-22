import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreChart extends Component {
  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { level, player, size } = this.props;
    const scores = player.scores[`level${level}`];
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;
    if (scores) {
      const start = 15;
      const actions = scores.topTimeChart.length;
      const xAxisLength = width - start,
        yAxisLength = height - start;
      const maxSeconds = Math.max(...scores.topTimeChart);
      const unitStepX = Math.floor(xAxisLength / actions),
        unitStepY = Math.floor(yAxisLength / maxSeconds);
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      let xCoord = start,
        yCoord = height - start;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(width - start, height - start);
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(start, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.font = '14px Arial';
      const delineationX = Math.ceil(actions / 10);
      const delineationY = Math.ceil(maxSeconds / 10);
      const numOfStepsX = Math.floor(actions / delineationX),
        numOfStepsY = Math.floor(maxSeconds / delineationY);
      const stepX = Math.round(xAxisLength / numOfStepsX);
      for (let i = 1, j = stepX; i < numOfStepsX; i = i + 1) {
        ctx.moveTo(j + start, height - 10);
        ctx.lineTo(j + start, height - 20);
        ctx.fillText(String(i * delineationX), j + 10, height);
        j = j + stepX;
      }
      ctx.stroke();
      const stepY = Math.round(yAxisLength / numOfStepsY);
      ctx.beginPath();
      for (
        let i = delineationY, j = stepY;
        i < numOfStepsY;
        i = i + delineationY
      ) {
        const step = height - start - j;
        ctx.moveTo(10, step);
        ctx.lineTo(20, step);
        ctx.fillText(String(i), 20, step + 5);
        j = j + stepY;
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      scores.topTimeChart.forEach(elem => {
        xCoord = Math.round(xCoord + unitStepX);
        yCoord = Math.round(height - elem * unitStepY);
        ctx.lineTo(xCoord, yCoord);
      });
      ctx.stroke();
      ctx.beginPath();
      ctx.fillText('Actions', width - 50, height - 20);
      ctx.fillText('Seconds', 20, 10);
      ctx.stroke();
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  render() {
    const { size, show, level, player } = this.props;
    const width = Math.round(size * 0.9),
      height = Math.round(size * 0.6);
    const className = show ? '' : 'd-none';
    const heading = player.scores[`level${level}`] ? (
      <h5>
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

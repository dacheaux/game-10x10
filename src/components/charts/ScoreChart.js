import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreChart extends Component {
  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { level, player, size } = this.props;
    const width = Math.round(size * 0.8);
    const height = Math.round(size * 0.6);
    const scores = player.scores[`level${level}`];
    if (scores) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let xCoord = 10,
        yCoord = height - 10;
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(width - 10, height - 10);
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(10, 0);
      ctx.stroke();
      const biggestValue = Math.max(...scores.topTimeChart);
      const yStep = Math.floor((height - 10) / biggestValue);
      console.log(yStep);
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      scores.topTimeChart.forEach(elem => {
        xCoord = Math.round(xCoord + width / 10);
        yCoord = Math.round(height - elem * yStep);
        console.log('xCoord: %s, yCoord: %s', xCoord, yCoord);
        ctx.lineTo(xCoord, yCoord);
      });
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }

  render() {
    const { size, show } = this.props;
    const width = Math.round(size * 0.8),
      height = Math.round(size * 0.6);
    const className = show ? "" : "d-none";
    return (
      <div className={className}>
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

function mapStateToProps({ gameProps: { player, level } }) {
  return { player, level };
}

export default connect(mapStateToProps)(ScoreChart);

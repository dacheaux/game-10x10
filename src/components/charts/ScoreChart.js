import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreChart extends Component {
  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { level, player } = this.props;
    const width = this.props.size * 0.8;
    const height = this.props.size * 0.6;
    const scores = player.scores[`level${level}`];
    if (scores) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let xCoord = 0,
        yCoord = height;
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      const biggestValue = Math.max(...scores.topTimeChart);
      console.log(biggestValue);
      const yStep = Math.floor(height / biggestValue);
      console.log(yStep);
      scores.topTimeChart.forEach(elem => {
        xCoord = Math.round(xCoord + width / 10);
        yCoord = Math.round(height - elem * yStep);
        console.log('xCoord: %s, yCoord: %s', xCoord, yCoord);
        ctx.lineTo(xCoord, yCoord);
        ctx.stroke();
      });
      ctx.closePath();
    }
  }

  render() {
    const { level } = this.props;
    const { size } = this.props;
    const width = Math.round(size * 0.8),
      height = Math.round(size * 0.6);
    return (
      <div>
        <canvas ref="canvas" width={width} height={height} />
      </div>
    );
  }
}

function mapStateToProps({ gameProps: { player, level } }) {
  return { player, level };
}

export default connect(mapStateToProps)(ScoreChart);

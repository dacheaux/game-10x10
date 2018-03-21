import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreChart extends Component {
  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { level, player, size } = this.props;
    const width = Math.round(size * 0.9);
    const height = Math.round(size * 0.6);
    const scores = player.scores[`level${level}`];
    if (scores) {
      const actions = scores.topTimeChart.length;
      const maxSeconds = Math.max(...scores.topTimeChart);
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d'); 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let xCoord = 15,
        yCoord = height - 15;
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(width - 15, height - 15);
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(15, 0);
      ctx.font = "14px Arial";
      const stepX = (width - 15) / 10;
      for (let i = stepX, j = 1; i < 9 * stepX; i = i + stepX) {
        ctx.moveTo(i + 15, height - 10);
        ctx.lineTo(i + 15, height - 20);
        ctx.fillText(String(j), i + 10, height);
        ++j;
      }
      const stepY = Math.round((height - 15) / 10);
      for (let i = stepY; i < 9 * stepY; i = i + stepY) {
        ctx.moveTo(10, i);
        ctx.lineTo(20, i);
      }
      ctx.stroke();
      const yStep = Math.floor((height - 10) / maxSeconds);
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      scores.topTimeChart.forEach(elem => {
        xCoord = Math.round(xCoord + stepX);
        yCoord = Math.round(height - elem * yStep);
        ctx.lineTo(xCoord, yCoord);
      });
      ctx.strokeStyle = 'red';
      ctx.stroke();
      ctx.fillText("Actions", width - 50, height - 20);
      ctx.fillText("Seconds", 15, 10);
    }
  }

  render() {
    const { size, show } = this.props;
    const width = Math.round(size * 0.9),
      height = Math.round(size * 0.6);
    const className = show ? '' : 'd-none';
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

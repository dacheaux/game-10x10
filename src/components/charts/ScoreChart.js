import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreChart extends Component {
  componentDidMount() {
    console.log('ScoreChart props', this.props);   
  }

  componentDidUpdate() {
    this.drawChart()
  }

  drawChart() {
    const { level, player } = this.props;
    const scores = player.scores[`level${level}`];
    if (scores) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let xCoord = 0,
        yCoord = 500;
      ctx.beginPath();
      ctx.moveTo(xCoord, yCoord);
      scores.topTimeChart.forEach(elem => {
        xCoord = xCoord + 50;
        yCoord = yCoord - elem * 10;
        ctx.lineTo(xCoord, yCoord);
        ctx.stroke();
      });
      ctx.closePath();
    }
  }

  render() {
    const { level } = this.props;
    return (
      <div className="">
        <canvas ref="canvas" width={500} height={500} />
      </div>
    );
  }
}

function mapStateToProps({ gameProps: { player, level } }) {
  return { player, level };
}

export default connect(mapStateToProps)(ScoreChart);

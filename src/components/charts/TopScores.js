import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopScores extends Component {
  render() {
    if (!this.props.show) return null;
    let { level, player } = this.props;
    if (!player.scores[`level${level}`]) level = level - 1;
    const levels = [];
    for (let i = level; i > 0; i--) {
      levels.push(i);
    }
    const renderLevels = levels.map(level => {
      return <li key={level} className="list-group-item p-1">Level {level}</li>;
    });
    const renderTime = levels.map(level => {
      return <li key={level} className="list-group-item p-1">{player.scores[`level${level}`].topTime}</li>;
    });
    const renderTimesCompleted = levels.map(level => {
      return <li key={level} className="list-group-item p-1">{player.scores[`level${level}`].timesCompleted}</li>;
    });
    return (
      <div className="row mb-5">
        <div className="col-4">
          <h6 className="p-1 font-weight-bold">Level{' '}</h6>
          <div>
            <ul className="list-group list-group-flush">{renderLevels.slice(0, 7)}</ul>
          </div>
        </div>
        <div className="col-4">
          <h6 className="p-1 font-weight-bold">Time{' '}</h6>
          <div>
            <ul className="list-group list-group-flush">{renderTime.slice(0, 7)}</ul>
          </div>
        </div>
        <div className="col-4">
          <h6 className="p-1 font-weight-bold">Times completed{' '}</h6>
          <div>
            <ul className="list-group list-group-flush">{renderTimesCompleted.slice(0, 7)}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps: { player, level } }) {
  return { player, level };
}

export default connect(mapStateToProps)(TopScores);

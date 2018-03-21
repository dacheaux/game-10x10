import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopScores extends Component {
  render() {
    let { level, player } = this.props;
    console.log('player.scores', player.scores[`level${level}`]);
    if (!player.scores[`level${level}`]) level = level - 1;
    const levels = [];
    for (let i = level; i > 0; i--) {
      levels.push(i);
    }
    const renderLevels = levels.map(level => {
      return <li key={level} className="list-group-item">Level {level}</li>;
    });
    const renderTime = levels.map(level => {
      return <li key={level} className="list-group-item">{player.scores[`level${level}`].topTime}</li>;
    });
    const renderTimesCompleted = levels.map(level => {
      return <li key={level} className="list-group-item">{player.scores[`level${level}`].timesCompleted}</li>;
    });
    return (
      <div className="row">
        <div className="col-4">
          Level{' '}
          <div>
            <ul className="list-group">{renderLevels}</ul>
          </div>
        </div>
        <div className="col-4">
          Time{' '}
          <div>
            <ul className="list-group">{renderTime}</ul>
          </div>
        </div>
        <div className="col-4">
          Times completed{' '}
          <div>
            <ul className="list-group">{renderTimesCompleted}</ul>
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

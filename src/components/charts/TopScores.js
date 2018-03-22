import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';

class TopScores extends Component {
  state = { activeDropdown: 0 };

  showOtherTimes = e => {
    const item = parseInt(e.target.id);
    this.setState({ activeDropdown: item });
  };

  render() {
    if (!this.props.show) return null;
    let { level, player } = this.props;
    if (!player.scores[`level${level}`]) level = level - 1;
    const allLevels = [];
    for (let i = level; i > 0; i--) {
      allLevels.push(i);
    }

    const renderList = allLevels.map((item, i) => {
      const otherTimes = player.scores[`level${item}`].allTimes.slice(1, 4);
      const id = i + 1;
      const active = this.state.activeDropdown === id;
      const dropdownClass = classNames({
        'dropdown-content': true,
        'd-none': !active
      });
      return (
        <li key={_.uniqueId('item')} className="list-group-item p-1">
          <div className="d-flex justify-content-between w-100">
            <div className="col-4 p-0">Level {item}</div>
            <div id={id} className="col-4 p-0" onClick={this.showOtherTimes}>
              {player.scores[`level${item}`].topTime} seconds{' '}
              <div className={dropdownClass}>
                <span className="text-center">
                  <ul className="list-group list-group-flush">
                    {otherTimes.map(time => {
                      return <li className="list-group-item p-1 dropdown-bg" key={_.uniqueId('time')}>{time}</li>;
                    })}
                  </ul>
                </span>
              </div>
            </div>
            <div className="col-4 text-center">
              {player.scores[`level${item}`].timesCompleted}
            </div>
          </div>
        </li>
      );
    });
    return (
      <div className="row mb-5">
        <div className="col-12 d-flex">
          <h6 className="col-4 p-1 font-weight-bold">Level </h6>
          <h6 className="col-4 p-1 font-weight-bold">Time </h6>
          <h6 className="col-4 p-1 font-weight-bold text-center">
            Times completed{' '}
          </h6>
        </div>
        <div className="col-12">
          <ul className="list-group list-group-flush">
            {renderList.slice(0, 7)}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps: { player, level } }) {
  return { player, level };
}

export default connect(mapStateToProps)(TopScores);

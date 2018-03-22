import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';

class TopScores extends Component {
  state = { activeDropdown: 0, isActive: false };

  showOtherTimes = e => {
    const item = parseInt(e.target.dataset.id, 10);
    this.setState(prevState => {
      return { activeDropdown: item, isActive: !prevState.isActive };
    }, () => console.log(this.state));
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
      const id = ++i;
      const active = this.state.activeDropdown === id && this.state.isActive;
      const dropdownClass = classNames({
        'dropdown-content': true,
        'd-none': !active
      });
      return (
        <li key={_.uniqueId('item')} className="list-group-item p-1">
          <div className="d-flex justify-content-between w-100">
            <div className="col-4 p-0">Level {item}</div>
            <div className="col-4 p-0">
              {player.scores[`level${item}`].topTime} seconds{' '}
              <i className="fas fa-plus" data-id={id} onClick={this.showOtherTimes} />
              <div className={dropdownClass}>
                <span className="text-center">
                  <ul className="list-group list-group-flush">
                    {otherTimes.map(time => {
                      return (
                        <li
                          className="list-group-item p-1 dropdown-bg"
                          key={_.uniqueId('time')}
                        >
                          {time}
                        </li>
                      );
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
      <div className="row px-3 mb-5">
        <h5 className="text-danger">Top score</h5>
        <hr className="col-10 mt-1" />
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

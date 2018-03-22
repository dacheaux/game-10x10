import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import ChoosePlayer from './modals/ChoosePlayer';
import * as actions from '../actions';
import * as utils from '../utils';

class Menu extends Component {
  state = { isModalOpen: false };

  componentDidMount() {
    const fetched = utils.fetchPlayer('anonPlayer');
    this.props.selectPlayer(fetched.player, fetched.players);
  }

  onSelectLevel = ({ level }) => {
    const { player, players } = this.props.gameProps;
    this.props.initLevel(parseInt(level) || player.level);
  };

  toggleModal = () => {
    this.setState(
      prevState => {
        return { isModalOpen: !prevState.isModalOpen };
      },
      () => this.props.choosePlayer(this.state.isModalOpen)
    );
  };

  render() {
    const { player } = this.props.gameProps;
    const { handleSubmit, showTopScores } = this.props;
    return (
      <div className="row w-100 mx-2 mt-2">
        <div className="menu col-md-6 pl-2 pr-3 d-flex justify-content-between">
          <button className="btn btn-info btn-sm" onClick={this.toggleModal}>
            New player
          </button>
          <form
            className="form-inline"
            onSubmit={handleSubmit(this.onSelectLevel)}
          >
            <div className="form-group mx-4">
              <label htmlFor="level" className="col-8 p-0">
                Choose level:{' '}
              </label>
              <Field
                type="number"
                name="level"
                className="form-control col-4 p-1"
                id="level"
                component="input"
                min="1"
                max={player.level}
              />
            </div>
            <button type="submit" className="btn btn-dark btn-sm">
              Start game
            </button>
          </form>
        </div>
        <div className="col-md-6 p-0 d-flex justify-content-around">
          <div className="p-0">
            Hello, <span className="text-success font-weight-bold">{player.name}</span>
          </div>
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={showTopScores}
          >
            Show top scores
          </button>
        </div>
        <ChoosePlayer
          show={this.state.isModalOpen}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

function mapStateToProps({ gameProps }) {
  return { gameProps };
}

export default reduxForm({
  form: 'selectLevel'
})(connect(mapStateToProps, actions)(Menu));

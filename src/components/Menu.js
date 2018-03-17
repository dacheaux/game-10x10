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
    this.props.startGame(false);
    this.props.selectPlayer(fetched.player, fetched.players);
  }

  onSelectLevel = ({ level }) => {
    const { player, players } = this.props.gameProps;
    this.props.initLevel(parseInt(level) || player.level);
    this.props.startGame(true);
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
  };

  render() {
    const { gameProps } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="menu menu-top">
        <div className="col-8 p-0 d-flex">
          <button className="btn btn-primary btn-sm" onClick={this.toggleModal}>
            New player
          </button>
          <form
            className="form-inline"
            onSubmit={handleSubmit(this.onSelectLevel)}
          >
            <div className="form-group mx-4">
              <label htmlFor="level" className="col-8 p-0">Choose level: </label>
              <Field
                type="number"
                name="level"
                className="form-control col-4 p-1"
                id="level"
                component="input"
                min="1"
                max={gameProps.player.level}
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm">
              Start game
            </button>
          </form>
        </div>
        <div className="col-4 p-0 d-flex align-items-center justify-content-end">
          Hello, {gameProps.player.name}
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

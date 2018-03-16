import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import GameStats from './GameStats';
import ChoosePlayer from './ChoosePlayer';

import * as actions from '../actions';
import * as utils from '../utils';

class MainMenu extends Component {
  state = { isModalOpen: false };

  componentDidMount() {
    const fetched = utils.fetchPlayer('anonPlayer');
    console.log('fetched', fetched);
    this.props.startGame(false);
    this.props.selectPlayer(fetched.player, fetched.players);
    console.log('componentDidMount');
  }

  onSelectLevel = values => {
    const { player, players } = this.props.gameProps;
    this.props.initLevel(player, players);
    this.props.startGame(true);
    console.log('onSelectLevel', values);
  };

  onCloseModal = () => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
  };

  render() {
    const { gameProps, gameLogic } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if (!gameProps.mainMenu) return <GameStats />;
    return (
      <div>
        <button
          className="btn btn-primary create-new"
          onClick={this.onCloseModal}
        >
          Create new player
        </button>
        <form onSubmit={handleSubmit(this.onSelectLevel)}>
          <label htmlFor="quantity">Choose level: </label>
          <Field
            type="number"
            name="quantity"
            id="quantity"
            component="input"
            min="1"
            max={gameProps.level}
          />
          <p>
            <button type="submit">
              {gameProps.level !== 1 ? 'Continue playing' : 'Start new'}
            </button>
          </p>
        </form>
        <p>High scores</p>
        <ChoosePlayer show={this.state.isModalOpen} closeModal={this.onCloseModal} />
      </div>
    );
  }
}

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default reduxForm({
  form: 'selectLevel'
})(connect(mapStateToProps, actions)(MainMenu));

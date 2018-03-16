import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import GameStats from './GameStats';
import ChoosePlayer from './ChoosePlayer';
import * as actions from '../actions';

class MainMenu extends Component {
  state = { isModalOpen: false }

  componentDidMount() {
    const playerName = localStorage.getItem('playerName') || 'anonPlayer';
    const players = JSON.parse(localStorage.getItem('players')) || [
      {
        name: 'anonPlayer',
        level: parseInt(localStorage.getItem('level')) || 1,
        lives: parseInt(localStorage.getItem('lives')) || 0,
        timesCompleted: JSON.parse(localStorage.getItem('timesCompleted')) || {}
      }
    ];
    const player = players.filter(player => player.name === playerName)[0];
    this.props.startGame(false);
    this.props.selectPlayer(player);
    console.log('componentDidMount');
  }

  onSelectLevel = values => {
    const level =
      values.quantity || parseInt(localStorage.getItem('level')) || 1;
    localStorage.setItem('level', level);
    const lives = parseInt(localStorage.getItem('lives')) || 0;
    localStorage.setItem('lives', lives);
    this.props.initLevel(level, lives);
    this.props.startGame(true);
    console.log('onSelectLevel', values);
  };

  choosePlayer = () => {
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
          onClick={this.choosePlayer}
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
        <ChoosePlayer show={this.state.isModalOpen} />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';
import * as utils from '../utils';

class ChoosePlayer extends Component {
  state = { close: false }

  onSelectPlayer = ({ playerName }) => {
    console.log('playerName', playerName);
    const fetched = utils.fetchPlayer(playerName);
    console.log('onSelectPlayer', fetched);
    this.props.startGame(false);
    this.props.selectPlayer(fetched.player, fetched.players);
    console.log('startGame && selectPlayer');
    this.props.closeModal()
  };

  render() {
    if (!this.props.show || this.state.close) {
      return null;
    }
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.1)',
      padding: 50
    };
    const modalStyle = {
      backgroundColor: '#D8D8D8',
      borderRadius: 5,
      maxWidth: 400,
      minHeight: 150,
      margin: '0 auto',
      padding: 10
    };
    const { handleSubmit } = this.props;
    const { players } = this.props.gameProps;
    const playersList = players.map(player => {
      return <option value={player.name} key={player.name} />;
    });

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modalDialog" style={modalStyle}>
          <p>Select player from dropdown or enter new player</p>
          <div>
            <form onSubmit={handleSubmit(this.onSelectPlayer)}>
              <Field component="input" list="players" name="playerName" />
              <Field component="datalist" id="players" name="savedPlayers">{playersList}</Field>
              <input type="submit" value="Choose" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default reduxForm({
  form: 'choosePlayer'
})(connect(mapStateToProps, actions)(ChoosePlayer));

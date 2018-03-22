import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions';
import * as utils from '../../utils';

class ChoosePlayer extends Component {
  onSelectPlayer = ({ playerName }) => {
    const fetched = utils.fetchPlayer(playerName);
    this.props.startGame(false);
    this.props.selectPlayer(fetched.player, fetched.players);
    this.props.toggleModal();
  };

  render() {
    if (!this.props.show) {
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
    const modalDialog = {
      position: 'relative',
      backgroundColor: '#D8D8D8',
      maxWidth: 400,
      minHeight: 150,
      margin: '0 auto',
      padding: 10
    };
    const closeButtonStyle = {
      position: 'absolute',
      right: 5,
      bottom: 5
    };
    const { handleSubmit } = this.props;
    const { players } = this.props.gameProps;
    const playersList = players.map(player => {
      return <option value={player.name} key={player.name} />;
    });

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modalDialog border border-dark rounded" style={modalDialog}>
          <p>Select player from dropdown or enter new player</p>
          <div>
            <form
              className="form-inline"
              onSubmit={handleSubmit(this.onSelectPlayer)}
            >
              <Field
                className="form-control w-75"
                component="input"
                list="players"
                name="playerName"
              />
              <Field component="datalist" id="players" name="savedPlayers">
                {playersList}
              </Field>
              <input
                className="btn btn-success"
                type="submit"
                value="Choose"
              />
            </form>
          </div>
          <i
            className="fas fa-times"
            onClick={this.props.toggleModal}
            style={closeButtonStyle}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps }) {
  return { gameProps };
}

export default reduxForm({
  form: 'choosePlayer'
})(connect(mapStateToProps, actions)(ChoosePlayer));

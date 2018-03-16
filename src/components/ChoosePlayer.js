import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';

class ChoosePlayer extends Component {
  onSelectPlayer = ({ playerName }) => {
      console.log('onSelectPlayer', playerName);
      const player = {
        name: playerName,
        level: 1,
        lives: 0,
        timesCompleted: 0
      };
      this.props.selectPlayer(player);
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

    const modalStyle = {
      backgroundColor: '#D8D8D8',
      borderRadius: 5,
      maxWidth: 400,
      minHeight: 150,
      margin: '0 auto',
      padding: 10
    };

    const { handleSubmit } = this.props;

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modalDialog" style={modalStyle}>
          <p>Click to choose player</p>
          {this.props.children}
          <p>Or create new</p>
          <div className="footer">
            <form onSubmit={handleSubmit(this.onSelectPlayer)}>
              <Field type="text" name="playerName" id="player" component="input" />
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

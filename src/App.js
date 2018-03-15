import React, { Component } from 'react';
import { connect } from 'react-redux';

import Row from './components/Row';
import * as actions from './actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    if (!localStorage.getItem('level')) localStorage.setItem('level', 1);
    this.props.initLevel(localStorage.getItem('level'));
    this.props.showMainMenu(true);
  }

  componentDidUpdate() {
    console.log('App updated');
  }

  state = { lives: 0 };

  gameInfo() {
    return (
      <div>
        Info:
        <h4>Level: {this.props.gameProps.level}</h4>
        <h4>Number of lives: {this.props.gameProps.lives}</h4>
      </div>
    );
  }

  mainMenu() {
    if (!this.props.gameProps.mainMenu) return this.gameInfo();
    return (
      <div>
        <p>
          <button onClick={() => this.props.showMainMenu(false)}>
            Start new or continue
          </button>
        </p>
        <p>High scores</p>
      </div>
    );
  }

  render() {
    const Columns = [];
    for (let i = 1; i <= 10; i++) {
      Columns.push(<Row rowNum={i} key={i} />);
    }

    return (
      <div className="container-fluid">
        <div className="App row">
          <div className="main">{Columns}</div>
          <div className="info">{this.mainMenu()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ gameProps }) {
  return { gameProps };
}

export default connect(mapStateToProps, actions)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Row from './components/Row';
import * as actions from './actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    if (!localStorage.getItem('level')) localStorage.setItem('level', 1);
    this.props.initLevel(
      localStorage.getItem('level'),
      localStorage.getItem('lives')
    );
    this.props.showMainMenu(true);
  }

  componentDidUpdate() {
    console.log('App updated');
    // if (!this.props.gameLogic.timer) return this.setState({ elapsedTime: 0 })
  }

  componentWillUnmount() {
    
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps.gameLogic.timer && (nextProps.gameLogic.timer !== this.props.gameLogic.timer)) {
      this.setState({ elapsedTime: 0 })
      this.interval = setInterval(this.tick, 1000);
    } else if (!nextProps.gameLogic.timer) {
      clearInterval(this.interval);
    }
  }

  state = { elapsedTime: 0 };

  tick = () => {  
    this.setState(prevState => {
      console.log(prevState.elapsedTime);
      return { elapsedTime: ++prevState.elapsedTime };
    });
  }

  gameInfo() {
    const { levelSquares, checkedSquares, timer } = this.props.gameLogic;
    return (
      <div>
        Info:
        <h4>Elapsed time: {this.state.elapsedTime}</h4>
        <h4>Fields left to click: {levelSquares.length - checkedSquares.length}</h4>
        <h4>Level: {this.props.gameProps.level}</h4>
        <h4>Number of lives: {this.props.gameProps.lives}</h4>
      </div>
    );
  }

  newLevel = () => {
    this.props.showMainMenu(false)
    // if (this.interval) clearInterval(this.interval);
  }

  mainMenu() {
    if (!this.props.gameProps.mainMenu) return this.gameInfo();
    return (
      <div>
        <p>
          <button onClick={this.newLevel}>
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

function mapStateToProps({ gameProps, gameLogic }) {
  return { gameProps, gameLogic };
}

export default connect(mapStateToProps, actions)(App);

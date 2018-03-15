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
  }

  componentDidUpdate() {
    console.log('updated');
  }

  render() {
    let Columns = [];
    for (let i = 1; i <= 10; i++) {
      Columns.push(<Row rowNum={i} key={i}/>);
    }

    return <div className="App">{Columns}</div>;
  }
}

function mapStateToProps({ gameProps }) {
  return {gameProps}
}

export default connect(mapStateToProps, actions)(App);

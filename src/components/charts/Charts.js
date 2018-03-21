import React, { Component } from 'react';
import Measure from 'react-measure';

import TopScores from './TopScores';
import ScoreChart from './ScoreChart';

export default class Charts extends Component {
  state = {
    dimensions: {
      width: 100,
      height: 100
    }
  };

  render() {
    const { width, height } = this.state.dimensions;
    return (
      <div className="mt-2">
        <Measure
          bounds
          onResize={contentRect => {
            this.setState({ dimensions: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              <TopScores show={this.props.show}/>
              <ScoreChart size={width} show={this.props.show} />
            </div>
          )}
        </Measure>
      </div>
    );
  }
}

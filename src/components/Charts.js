import React, { Component } from 'react';
import starman from '../images/starman.jpg';

class Charts extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const img = this.refs.image;
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = '40px Courier';
      ctx.fillText(this.props.text, 210, 75);
    };

    const dataURL = canvas.toDataURL();
  }

  render() {
    return (
      <div className="">
        <canvas ref="canvas" width={640} height={425} />
        <img ref="image" src={starman} className="d-none" />
      </div>
    );
  }
}

export default Charts;

import React, { Component } from 'react';

class Modal extends Component {
  render() {
    if(!this.props.show) {
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

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}

          <div className="footer">
            <button onClick={e => this.props.onBtnClick(false)}>
              No
            </button>
            <button onClick={e => this.props.onBtnClick(true)} style={{marginLeft: 20}}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
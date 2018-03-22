import React from 'react';

export default (props) => {
    if(!props.show) {
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
      backgroundColor: '#D8D8D8',
      maxWidth: 400,
      minHeight: 150,
      margin: '0 auto',
      padding: 10
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modalDialog border border-dark rounded" style={modalDialog}>
          {props.children}
          <div className="footer">
            <button className="btn btn-secondary" onClick={e => props.yesOrNo(false)}>
              No
            </button>
            <button className="btn btn-success" onClick={e => props.yesOrNo(true)} style={{marginLeft: 20}}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
}

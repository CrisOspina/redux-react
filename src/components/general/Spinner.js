import React from 'react';
import '../../css/spinner.css';

const Spinner = (props) => {
  return (
    <React.Fragment>
      <div className="center">
        <div className="lds-spinner">
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Spinner;

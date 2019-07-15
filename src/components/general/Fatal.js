import React from 'react';

const Fatal = (props) => {
  return (
    <React.Fragment>
      <h2 className="center rojo">{ props.mensaje }</h2>
    </React.Fragment>
  );
}

export default Fatal;

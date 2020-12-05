import React from 'react';

import './Card.css';

const Card = props => {
  return (
    <div className="card" onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default Card;

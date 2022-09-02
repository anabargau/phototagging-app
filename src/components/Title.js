import React from 'react';
import WaldoImg from '../img/waldo-title.jpg';

function Title() {
  return (
    <div className="title">
      <img className="title-image" src={WaldoImg} alt="waldo title" />
      <div className="title-where"> Where's</div>
      <div className="title-waldo">Waldo ?</div>
    </div>
  );
}

export default Title;

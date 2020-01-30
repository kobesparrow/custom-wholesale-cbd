import React from 'react'
import Gym from '../../images/logo-selector/gym.svg';
import Hemp from '../../images/logo-selector/hemp.svg'
import Moon from '../../images/logo-selector/moon.svg';
import Yoga from '../../images/logo-selector/yoga.svg';

const LogoSelector = (props) => {

  // const functionTest = () => {
  //   console.log('test')
  // }

  return (
    <div>
      <p>Your logos goes here, in the meantime, select from one of these fun options.</p>
      <button onClick={ () => props.setLogoChoice('gym') }>
        <img src={ Gym } className="logo-sample" />
      </button>
      <button onClick={ () => props.setLogoChoice('hemp') }>
        <img src={ Hemp } className="logo-sample" />
      </button>
      <button onClick={ () => props.setLogoChoice('yoga') }>
        <img src={ Yoga } className="logo-sample" />
      </button>
      <button onClick={ () => props.setLogoChoice('moon') }>
        <img src={ Moon } className="logo-sample" />
      </button>
    </div>
  );
}

export default LogoSelector
import React from 'react'
import { logo } from '../../../assets';

const Header = () => {
  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
      <a className='navbar-brand mx-3' href="/">
        <img src={logo} width="50" height="50" className="d-inline-block align-center" alt="" />
        Pesona Malang
      </a>
    </nav>
    </div>
  )
}

export default Header;

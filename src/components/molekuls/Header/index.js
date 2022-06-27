import React from 'react';
import { Logo } from '../../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container d-flex">
          <div className='navbar-brand mx-3 flex-grow-1 p-2'>
            <a href="/" style={{width: '60px', height: '60px'}}>
              <img src={Logo} width="60" height="60" className="d-inline-block align-center" alt="logo pesona malang" />
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav fw-bold p-2">
            <button className='btn btn-danger me-4 p-1 px-3' onClick={handleLogout}>
              {logoutIcon} Logout
            </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;

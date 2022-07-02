import React from 'react';
import { Logo } from '../../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Header = () => {
  const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        window.location.reload();
        Swal.fire(
          'Good job!',
          'you have successfully logged out!',
          'success'
        )
      }
    })
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container d-flex">
          <div className='navbar-brand mx-3 flex-grow-1 p-2'>
            <a href="/" className='py-3'>
              <img src={Logo} width="60" height="60" className="d-inline-block align-center" alt="logo pesona malang" />
            </a>
          </div>
          <button 
            className="navbar-toggler py-2" 
            type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          ><span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav fw-bold p-2">
            <button className='btn btn-danger' style={{padding: '8px 16px'}} onClick={handleLogout}>
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

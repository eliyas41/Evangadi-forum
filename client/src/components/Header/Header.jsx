import React, { useContext } from 'react'
import logo from "../../assets/evangadi-logo-black.png"
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";

const Header = () => {
  const { user, setuser, token } = useContext(AppState);
  // console.log(user)
  // console.log(token)
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user and token (assuming the token is stored in local storage)
    localStorage.removeItem('token');
    setuser(null);
    navigate('/login'); // Redirect to the login page or any other desired page after logout
  };


  return (
    <section className='sticky-top custom-sticky'>
      <nav className="navbar p-3 navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#"><img src={logo} alt="EvangadiLogo" /></a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end fw-semibold" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item align-items-center d-flex">
                <a className="nav-link active" aria-current="page" href="http://localhost:3000/">Home</a>
              </li>
              <li className="nav-item align-items-center d-flex">
                <a className="nav-link" href="#">How It Works</a>
              </li>
              {/* <li className="nav-item align-items-center d-flex">
                <a className="nav-link" href="http://localhost:3000/login"><button className='btn btn-primary fw-bold px-5 action__btn'>
                  SIGN IN
                </button></a>
              </li> */}

              <li className="nav-item align-items-center d-flex">
                {user ? (
                  <Link className="nav-link" to="http://localhost:3000/login">
                    <button className='btn btn-primary fw-bold px-5 action__btn' onClick={handleLogout}>
                      Logout
                    </button>
                  </Link>
                ) : (
                  <Link className="nav-link" to="http://localhost:3000/login">
                    <button className='btn btn-primary fw-bold px-5 action__btn'>
                      Sign In
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </section>
  )
}

export default Header

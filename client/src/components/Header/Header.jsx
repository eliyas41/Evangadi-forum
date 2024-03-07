import React from 'react'
import logo from "../../assets/evangadi-logo-black.png"

const Header = () => {
  return (
    <section className='sticky-top custom-sticky'>
      <nav class="navbar p-3 navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><img src={logo} alt="EvangadiLogo" /></a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end fw-semibold" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item align-items-center d-flex">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item align-items-center d-flex">
                <a class="nav-link" href="#">How It Works</a>
              </li>
              <li class="nav-item align-items-center d-flex">
                <a class="nav-link" href="#"><button className='btn btn-primary fw-bold px-5 action__btn'>SIGN IN</button></a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </section>
  )
}

export default Header
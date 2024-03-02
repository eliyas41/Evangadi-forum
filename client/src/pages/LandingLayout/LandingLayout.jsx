import React from 'react'
import Header from '../../components/Header/Header'
import bg from "../../assets/bg svg.svg"
// import Home from '../Home/Home'
// import Footer from '../Footer/Footer'

const Landing = () => {
  return (
    <section>
      <Header />
      <main className='landing  bg-body-tertiary' style={{ background: `url(${bg})` }}>

      </main>
    </section>
  )
}

export default Landing
import React from 'react'
import Header from '../../components/Header/Header'
import Question from '../../components/Question/Question'

const Home = () => {
  return (
    <>
      <Header />
      <section className='bg-body-tertiary'>
        <div className="d-flex justify-content-around pt-5">
          <button className='btn btn-primary action__btn px-5'>Ask Question</button>
          <p className='fw-semibold'><span className='text-warning'>Welcome,</span> Elvis</p>
        </div>

        <div className='container mt-5'>
          <h2>Questions</h2>
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
      </section>
    </>
  )
}

export default Home
import React from 'react'

const SignUp = () => {
  return (
    <div className='col card p-5 text-center'>
      <div>
        <h3 className='m-3'>Join the network</h3>
        <p className='mb-5'>Already have an account?{" "}
          <a href="" className='fw-semibold text-decoration-non text-warning'> Sing in</a>
        </p>
      </div>

      <form action="">
        <div className='d-flex flex-column gap-3'>
          <input type="email" className='form-control p-3' placeholder='Email address' />
          <div className='d-flex gap-3'>
            <input type="text" className='form-control p-3' placeholder='First Name' />

            <input type="text" className='form-control p-3' placeholder='Last Name' />
          </div>
          <input type="password" className='form-control p-3' placeholder='password' />
        </div>

        <div className='p-3'>
          <small>I agree to the privacy and terms of service.</small>
        </div>

        <div className='d-grid'>
          <button type='submit' className='btn btn-primary action__btn fs-5 fw-semibold'>Agree and join</button>
          <div className='mt-3'>
            <p className='d-flex justify-content-center'>
              <a href="" className='fw-semibold text-decoration-none text-warning'>Already have an account?</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
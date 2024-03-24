import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../../axiosConfig';
import { ClipLoader } from "react-spinners";

const LogIn = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  // Reference for the username and password fields.
  const emailDom = useRef(null)
  const passwordDom = useRef(null)
  const [loading, setLoading] = useState({
    logIn: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(e.target.name);
    if (e.target.name === "login") setLoading({ ...loading, logIn: true });
    // get values from the input fields
    let emailValue = emailDom.current.value
    let passValue = passwordDom.current.value
    if (
      !emailValue ||
      !passValue
    ) {
      // console.log('Please provide all required information')
      return;
    }
    try {
      const { data } = await axios.post('/users/login', {
        email: emailValue,
        password: passValue
      })
      console.log('Login Successful!')
      // console.log(data)
      localStorage.setItem("token", data.token)
      navigate('/')
      window.location.reload();
    } catch (err) {
      console.log(err?.response?.data)
      console.log("Something went wrong!")
    }
  }

  return (
    <div className='col card p-5 text-center'>
      <div>
        <h3 className='m-3'>Login to your account</h3>
        <p className='mb-5'>Don't have an account? {" "}
          <a href="#" onClick={() => setCurrentPage("signup")} className='fw-semibold text-decoration-non text-warning'>Create a new account</a>
        </p>
      </div>

      <form onSubmit={handleSubmit} action="">
        <div className='d-flex flex-column gap-3'>
          <input ref={emailDom} type="email" className='form-control p-3' placeholder='Email address' />

          <input ref={passwordDom} type="password" className='form-control p-3' placeholder='password' />
        </div>

        <div className='mt-3'>
          <p className='d-flex justify-content-end'>
            <a href="" className='fw-semibold text-decoration-none text-warning'>Forgot Password?</a>
          </p>
        </div>

        <div className='d-grid'>
          <a href="">
            <button type='submit' className='btn btn-primary action__btn fs-5 fw-semibold'>Log In</button>
            <button
              type="submit"
              onClick={authHandler}
              name="login"
              className='btn btn-primary action__btn fs-5 fw-semibold'>
              {loading.signIn ? (
                <ClipLoader color="#000" size={15} />
              ) : (
                "Log In"
              )}
            </button>

          </a>
        </div>
      </form>
    </div>
  )
}

export default LogIn;
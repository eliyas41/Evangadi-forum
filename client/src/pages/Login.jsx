import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../axiosConfig';

const Login = () => {
  const navigate = useNavigate();

  // Reference for the username and password fields.
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      // console.log('Registration Successful!')
      console.log(data)
      localStorage.setItem("token", data.token)
      // navigate('/')
    } catch (err) {
      console.log(err?.response?.data)
      console.log("Something went wrong!")
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder='email' />
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder='password' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </section>
  )
}

export default Login
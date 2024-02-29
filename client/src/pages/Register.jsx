import React, { useRef } from 'react'
import axios from '../axiosConfig'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const userNameDom = useRef(null)
  const firstNameDom = useRef(null)
  const lastNameDom = useRef(null)
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // get values from the input fields
    let usernameValue = userNameDom.current.value
    let firstnameValue = firstNameDom.current.value
    let lastnameValue = lastNameDom.current.value
    let emailValue = emailDom.current.value
    let passValue = passwordDom.current.value
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passValue
    ) {
      // console.log('Please provide all required information')
      return;
    }
    try {
      await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue
      })
      // console.log('Registration Successful!')
      navigate('/login')
    } catch (err) {
      console.log(err.message)
      console.log("Username or Email already in use.")
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username: </span>
          <input ref={userNameDom} type="text" placeholder='username' />
        </div>
        <br />
        <div>
          <span>First name: </span>
          <input ref={firstNameDom} type="text" placeholder='first name' />
        </div>
        <br />
        <div>
          <span>Last name: </span>
          <input ref={lastNameDom} type="text" placeholder='last name' />
        </div>
        <br />
        <div>
          <span>Email: </span>
          <input ref={emailDom} type="email" placeholder='email' />
        </div>
        <br />
        <div>
          <span>Password: </span>
          <input ref={passwordDom} type="password" placeholder='password' />
        </div>
        <button type='submit'>Register</button>
      </form>
    </section>
  )
}
export default Register
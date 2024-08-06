import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "../../axios/axiosConfig";
import "./account.css";

function Register() {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userNameRef.current.value.trim();
    const firstname = firstNameRef.current.value.trim();
    const lastname = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !firstname || !lastname || !email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      // http://localhost:5000/api/users/register
      await axios.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center align-items-center vh-50">
        <div className="col-md-6">
          <div className="authfy-panel panel-login text-center p-4 shadow">
            <div className="authfy-heading mb-4">
              <h3 className="auth-title">Join the Network</h3>
              <p>
                Already have an account?
                <Link to="/login" className="lnk-toggler small-text">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  ref={userNameRef}
                  type="text"
                  className="form-control mb-3"
                  placeholder="Username"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  ref={firstNameRef}
                  type="text"
                  className="form-control mb-3"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  ref={lastNameRef}
                  type="text"
                  className="form-control mb-3"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  ref={emailRef}
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  ref={passwordRef}
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="form-group form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheck"
                  required
                />
                <label className="form-check-label " htmlFor="termsCheck">
                  I agree to the
                  <Link
                    to="/legal/privacy/"
                    target="_blank"
                    className="small-text">
                    privacy policy
                  </Link>
                  and
                  <Link
                    to="/legal/terms/"
                    target="_blank"
                    className="small-text">
                    terms of service
                  </Link>
                </label>
              </div>

              <Button type="submit" className="btn btn-primary btn-block">
                Agree and Join
              </Button>
            </form>

            <div className="mt-3">
              <Link className="lnk-toggler small-text" to="/login">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12 col-sm-6 authfy-panel panel-signup">
          <div className="padd-text fadeInLeft justify-content-center align-items-center vh-100">
            <small className="small-text mt-5">About</small>
            <h2 className="title-h2 text-gradient">Evangadi Networks Q&A</h2>

            <p className="font-p mg-bt-30">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              condimentum mauris at libero lobortis, sed placerat magna
              vulputate. Nunc pulvinar ligula eget justo volutpat, eget feugiat
              sem pharetra. Proin id felis et nisl convallis sollicitudin. Nulla
              facilisi. Nam vestibulum turpis eget eros egestas, sed hendrerit
              dolor convallis. Quisque vel felis purus.
            </p>

            <p className="font-p mg-bt-30">
              Phasellus nec risus at ligula volutpat eleifend. Donec in ligula
              nulla. Nullam sit amet turpis nec ante congue rhoncus non vitae
              ex. Aenean at arcu dapibus, gravida tortor id, tincidunt quam.
              Proin at tortor et sapien consequat mattis id a quam. Vivamus a
              neque sit amet ligula fermentum lobortis. Aenean ultricies libero
              ut ex hendrerit, a mattis sem bibendum.
            </p>



            <a
              href="#"
              className="btn btn-blue lnk-toggler"
              data-panel=".panel-signup">
              HOW IT WORKS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

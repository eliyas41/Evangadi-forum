import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axiosConfig";
import { UserContext } from "../../context/UserContext";
import { ClipLoader } from "react-spinners"; // Import CircleLoader component from react-spinners
import "./account.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [userData, setUserData] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = email.trim();
    const passValue = password.trim();

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      localStorage.setItem("auth-token", data.token);

      setUserData({
        token: data.token,
        user: data.user,
        config: {
          headers: { "x-auth-token": data.token },
        },
      });

      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg || "An error occurred");
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="authfy-panel panel-login text-center p-4 shadow">
            <div className="authfy-heading mb-4">
              <h3 className="auth-title">Login to your account</h3>
              <p>
                Don’t have an account?{" "}
                <Link to="/register" className="lnk-toggler small-text">
                  Create a new account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Conditionally render spinner if loading */}
              {isLoading ? (
                <div className="text-center">
                  <ClipLoader
                    color="#00BFFF" // Specify color
                    size={50} // Specify size in pixels
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3">
                  Login
                </button>
              )}
            </form>

            <div className="mt-3">
              <Link to="/register" className="small-text">
                Create an account ?
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block">
          <div className="padd-text fadeInLeft">
            <small className="small-text">About</small>
            <h2 className="title-h2">Evangadi Networks Q&A</h2>
            <p className="font-p mg-bt-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              condimentum mauris at libero lobortis, sed placerat magna
              vulputate.
            </p>

            <p className="font-p mg-bt-10">
              Phasellus nec risus at ligula volutpat eleifend. Donec in ligula
              nulla. Nullam sit amet turpis nec ante congue rhoncus non vitae
              ex. Aenean at arcu dapibus, gravida tortor id,
            </p>

            <p className="font-p mg-bt-10">
              Maecenas tristique eleifend efficitur. Quisque egestas turpis non
              purus gravida, id euismod odio efficitur. Fusce non velit non
              nulla dictum tincidunt.
            </p>
            <a href="/explained/" className="btn btn-blue">
              How it works
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

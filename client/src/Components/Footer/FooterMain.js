import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assests/Images/footerlogo.png";

import "./footer.css";

function FooterMain() {
  return (
    <footer className="footer">
      <div className="footer-warpper">
        <div className="footer-top">
          <div className="container">
            <div className="footer-bottom-content clearfix">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="logo-footer">
                    <Link className="navbar-brand" to="/">
                      <img src={logo} alt="" />
                    </Link>
                  </div>

                  <ul className="footer-social-list list-social list-inline">
                    <li>
                      <Link to="https://www.facebook.com/EthiopiansNetwork">
                        <i className="social_facebook "></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.instagram.com/evangaditech/">
                        <i className="social_instagram "></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.youtube.com/c/weareethiopians">
                        <i className="social_youtube "></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h5>Useful Link</h5>
                  <ul className="list-menu">
                    <li>
                      <Link to="/explained">How it works </Link>
                    </li>
                    <li>
                      <Link to="/legal/terms/">Terms of Service</Link>
                    </li>
                    <li>
                      <Link href="/legal/privacy/">Privacy policy</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h5>Contact Info</h5>
                  <ul className="list-menu contact-list">
                    <li>Evangadi Networks</li>
                    <li>
                      <Link
                        to="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="8bf8fefbfbe4f9ffcbeefdeae5eceaefe2a5e8e4e6">
                        [email&#160;protected]
                      </Link>
                    </li>
                    <li>+1-202-386-2702</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterMain;

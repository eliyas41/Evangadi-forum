import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "../../axios/axiosConfig";
import "./question.css";

const AskQuestion = () => {
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();
  const titleRef = useRef();
  const questionRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const question = questionRef.current.value.trim();

    if (!title || !question) {
      alert("Both fields are required.");
      return;
    }

    try {
      await axios.post(
        "/questions/newquestion",
        { title, question },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      titleRef.current.value = "";
      questionRef.current.value = "";
      navigate("/");
    } catch (err) {
      console.log("Problem:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <section className="container" style={{ paddingTop: "100px" }}>
      <div className="d-flex flex-column align-items-center my-5">
        <h3>Steps to write a good question</h3>
        <ul style={{ fontSize: "large", alignItems: "baseline" }}>
          <li>Summarize your question in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <div className="container" style={{ width: "90%" }}>
        <div
          className="container"
          style={{
            paddingTop: "50px",
            textAlign: "center",
            fontWeight: "bold",
          }}>
          <h3>Ask a public question</h3>
          <Link to="/">Go to Question Page</Link>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div style={{ width: "100%" }}>
            <input
              ref={titleRef}
              style={{
                marginTop: "15px",
                height: "60px",
                width: "100%",
                borderRadius: "10px",
                padding: "10px 15px",
              }}
              maxLength="200"
              type="text"
              name="title"
              placeholder="Title"
            />
            <div>
              <textarea
                ref={questionRef}
                style={{
                  marginTop: "15px",
                  height: "200px",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "10px 15px",
                }}
                maxLength="255"
                name="question"
                placeholder="Question Description..."
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
              }}>
              <button
                style={{
                  padding: "10px 25px",
                  borderRadius: "5px",
                }}
                className="btn btn-lg btn-primary"
                type="submit">
                Post Your Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AskQuestion;

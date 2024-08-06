import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "../../axios/axiosConfig";
import AnswerDetail from "./AnswerDetail";

const Answer = () => {
  const { id: question_id } = useParams();
  const [userData] = useContext(UserContext);
  const [questionData, setQuestionData] = useState({
    question: {},
    answers: [],
  });
  const answerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestionAndAnswers = async () => {
      try {
        const [questionResponse, answersResponse] = await Promise.all([
          axios.get(`/questions/getquestionbyid/${question_id}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
          }),
          axios.get(`/answers/getanswers/${question_id}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
          }),
        ]);

        setQuestionData({
          question: questionResponse.data.data,
          answers: answersResponse.data.data,
        });
      } catch (err) {
        console.error("Problem:", err.response?.data?.msg || err.message);
      }
    };

    loadQuestionAndAnswers();
  }, [question_id, userData.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = answerRef.current.value.trim();

    if (!answer) {
      alert("Answer field is required.");
      return;
    }

    try {
      await axios.post(
        "/answers/newanswer",
        { question_id, answer },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setQuestionData((prevData) => ({
        ...prevData,
        answers: [
          ...prevData.answers,
          {
            answer,
            user_name: userData.user.display_name,
            time: new Date(),
          },
        ],
      }));
      answerRef.current.value = "";
    } catch (err) {
      console.error("Problem:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <section className="container" style={{ paddingTop: "100px" }}>
      <div>
        <h2>Questions</h2>
        {questionData.answers.length > 0 && (
          <h2 className="community_title">Answers From The Community</h2>
        )}
        <div>
          {questionData.answers.map((value, index) => (
            <AnswerDetail answer={value} key={index} />
          ))}
        </div>
        <div className="container" style={{ width: "90%" }}>
          <div className="text-center font-weight-bold mb-4">
            <h2>Answer The Top Question</h2>
            <Link to="/">Go to Question Page</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              ref={answerRef}
              className="form-control mb-3"
              style={{ height: "200px", borderRadius: "10px" }}
              maxLength="200"
              placeholder="Your Answer . . ."
            />
            <button className="btn btn-lg btn-primary" type="submit">
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Answer;

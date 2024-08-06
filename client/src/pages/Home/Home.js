import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import QuestionDetail from "../Question/QuestionDetail";
import axios from "../../axios/axiosConfig";
// import "../Home/home.css";
import "../LoginPage/account.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData] = useContext(UserContext);
  const tokenRef = useRef(localStorage.getItem("auth-token"));
  const searchRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");

  const loadQuestions = useCallback(async () => {
    try {
      const { data } = await axios.get("/questions/getquestions", {
        headers: {
          Authorization: `Bearer ${tokenRef.current}`,
        },
      });
      setQuestions(data?.data || []);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }, []);

  useEffect(() => {
    if (!tokenRef.current) {
      navigate("/login");
    } else {
      loadQuestions();
    }
  }, [loadQuestions, navigate]);

  const handleClick = () => {
    navigate("/newquestion");
  };

  const filteredQuestions = useMemo(() => {
    if (!search) return questions;
    return questions.filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [questions, search]);

  return (
    <section className="container body-with-bg body-no-bg">
      <div className="header_row">
        <button className="blue_button" onClick={handleClick}>
          Ask Question
        </button>
        {userData.user ? (
          <h1 className="header_border">
            Welcome: {userData.user.display_name || "User"}
          </h1>
        ) : (
          <h1 className="header_border">Welcome: Guest</h1>
        )}
      </div>
      <div className="search" style={{ borderBottom: "0.1px solid" }}>
        <h2>Questions</h2>
        <input
          className="search_bar"
          type="text"
          placeholder="Search..."
          ref={searchRef}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {filteredQuestions.length === 0 ? (
          <div>No Result Found</div>
        ) : (
          filteredQuestions.map((quest, index) => (
            <QuestionDetail question={quest} key={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default Home;

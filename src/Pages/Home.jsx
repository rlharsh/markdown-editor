import React, { useContext, useEffect } from "react";

/* Import the Home stylesheet. */
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      <div className="home-wrapper__left">
        <p>Welcome to</p>
        <h1>MARKDOWN</h1>
        <div className="button-container">
          <button onClick={() => navigate("/login")}>Login</button>
          <button>Sign Up</button>
        </div>
      </div>
      <div className="home-wrapper__right"></div>
    </div>
  );
};

export default Home;

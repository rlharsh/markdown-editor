import React, { useContext, useEffect } from "react";

/* Import the Home stylesheet. */
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Home;

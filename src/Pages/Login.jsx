import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

// Import the Login stylesheet.
import "./login.css";

/* Import the Remix icons. */
import IconGoogle from "remixicon-react/GoogleFillIcon";
import {
  authSignInWithGoogle,
  auth,
  authSignInWithEmail,
} from "../assets/js/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    authSignInWithEmail(email, password);
  };

  return (
    <div className="fullscreen-flex">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Sign in</button>
        </form>
        <div className="other-login">
          <button onClick={authSignInWithGoogle}>
            <IconGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

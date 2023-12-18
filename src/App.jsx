import ThemeProvider, {
  ThemeContext,
} from "./Components/Providers/ThemeProvider/ThemeProvider";

import "./assets/js/firebase.js";

// Import the App stylesheet.
import "./index.css";
import PrimaryLayout from "./Components/Layouts/PrimaryLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import AuthenticationProvider from "./Components/Providers/AuthenticationProvider/AuthenticationProvider.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import Login from "./Pages/Login.jsx";
import Editor from "./Pages/Editor.jsx";

function App() {
  return (
    <AuthenticationProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <PrimaryLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Editor />} />{" "}
              {/* Define Editor as a child route */}
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthenticationProvider>
  );
}

export default App;

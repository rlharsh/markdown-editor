import React, { Children, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../Components/Providers/AuthenticationProvider/AuthenticationProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthenticationContext);

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

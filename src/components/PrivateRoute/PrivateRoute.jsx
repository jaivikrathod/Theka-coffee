import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
// import { useSelector} from "react-redux"
const PrivateRoute = ({ children }) => {
  

  const [login, setLogin] = useState(window.localStorage.getItem("loggedIn"));
  return login ? children : <Navigate to='/' />;
}; 

export default PrivateRoute;


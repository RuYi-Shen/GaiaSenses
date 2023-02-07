import { createContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/auth";

const UserContext = createContext();

function AuthProvider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

function RequireAuth({ children }) {
  const { userData } = useAuth();
  const location = useLocation();

  if (Object.keys(userData).length === 0) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}

export { AuthProvider, RequireAuth, UserContext };

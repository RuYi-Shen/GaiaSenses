import { createContext, useContext, useState } from "react";
import authService from "../services/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserContext = createContext();

function AuthProvider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

function useAuth() {
  const { userData, setUserData } = useContext(UserContext);

  const authActions = {
    signUp: (userInfo) => authService.signUp(userInfo),
    signIn: async (userInfo) => {
      const user = await authService.signIn(userInfo);
      authService.setAuthorization(user.token);
      setUserData(user);
      return user;
    },
    signOut: () => {
      authService.signOut();
      authService.setAuthorization(null);
      setUserData({});
    },
    restore: () => {
      const user = authService.localCredentials();
      authService.setAuthorization(user.token);
      setUserData(user);
    },
    hasLocalCredentials: () => {
      return authService.localCredentials() !== null;
    }
  }

  return { userData, authActions };
}

function RequireAuth({ children }) {
  const { userData } = useAuth();
  const location = useLocation();

  if (Object.keys(userData).length === 0) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}

export { AuthProvider, RequireAuth, useAuth };

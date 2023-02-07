import { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import authService from "../services/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const APIURL = "https://api.openweathermap.org/data/2.5/weather?";
const APIKEY = "10428b1c951b8f8f17e6acde5957b88f";


const UserContext = createContext();

function getLocalWeather() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        axios.get(`${APIURL}lat=${lat}&lon=${lon}&appid=${APIKEY}`)
          .then((response) => resolve(response.data))
          .catch((err) => reject(err));
      }, (err) => reject(err));
    }
    else {
      reject('Geolocation API not supported');
    }
  });
}

function AuthProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getLocalWeather()
      .then((weather) => setWeather(weather))
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, weather, setWeather }}>
      {children}
    </UserContext.Provider>
  )
}

function useAuth() {
  const { userData, setUserData, weather, setWeather } = useContext(UserContext);

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
      console.log('restored: ', user.token);
      setUserData(user);
    },
    hasLocalCredentials: () => {
      return authService.localCredentials() !== null;
    }
  }

  return { userData, authActions, weather, setWeather };
}

function RequireAuth({ children }) {
  const { userData } = useAuth();
  const location = useLocation();

  if (Object.keys(userData).length === 0) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}

export { AuthProvider, UserContext, RequireAuth, useAuth };

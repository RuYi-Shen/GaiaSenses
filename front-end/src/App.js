import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import Create from "./pages/Create";
import Favorite from "./pages/Favorite";
import Profile from "./pages/Profile";
import Sample from "./pages/Sample";
import UserContext from "./contexts/UserContext";

import "./css/reset.css";
import "./css/style.css";

function App() {
  const [userData, setUserData] = useState({});
  const [weather, setWeather] = useState({});

  return (
    <UserContext.Provider
      value={{ userData, setUserData, weather, setWeather }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
          <Route path="/sample" element={<Sample />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

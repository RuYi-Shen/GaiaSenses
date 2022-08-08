import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Daily from "./pages/Daily";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Add from "./pages/Add";
import UserContext from "./contexts/UserContext";
import { useState } from "react";

import "./css/reset.css";
import "./css/style.css";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/add" element={<Add />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

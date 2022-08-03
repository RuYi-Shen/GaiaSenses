import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Daily from "./pages/Daily";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Add from "./pages/Add";

import './css/reset.css';
import './css/style.css';

function App() {
  return (
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
  );
}

export default App;

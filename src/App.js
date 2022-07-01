import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Daily from "./pages/Daily";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

import './css/reset.css';
import './css/style.css';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingLayout/LandingLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingLayout/LandingLayout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
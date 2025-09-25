import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Cv from "./pages/Cv";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/cv" element={<Cv />} />
      </Routes>
    </Router>
  );
};

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

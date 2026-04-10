import { Routes, Route } from "react-router-dom";
import Startpage from "./pages/startpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Startpage />} />
    </Routes>
  );
}

export default App;
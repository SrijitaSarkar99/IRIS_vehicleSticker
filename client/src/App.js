import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Vehicles from "./pages/Vehicles"
import Stickers from "./pages/Stickers";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
       <Route path="/vehicles" element={<Vehicles />} />
       <Route path="/stickers" element={<Stickers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

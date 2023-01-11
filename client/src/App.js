import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Test from "./pages/test";
import Vehicles from "./pages/Vehicles"
import Table from "./pages/table"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/test" element={<Test/>} />
       <Route path="/vehicles" element={<Vehicles />} />
       <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

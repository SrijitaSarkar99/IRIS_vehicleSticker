import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard/Dashboard"
import Vehicles from "./pages/Vehicles"
import Stickers from "./pages/Stickers"
import Profile from "./pages/Profile"
import PrivateRoutes from "./components/util/PrivateRoutes"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        {/* <Route path="/SignIn" element={<SignIn />} /> */}
        <Route path="/SignUp" exact element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Dashboard" exact element={<Dashboard />} />
          <Route path="/vehicles" exact element={<Vehicles />} />
          <Route path="/stickers" exact element={<Stickers />} />
          <Route path="/Profile" exact element={<Profile />} />
        </Route>
        //TODO: Handle not found routes
        {/* <Route path="*" element={`<div>404 Not found<div/>`} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

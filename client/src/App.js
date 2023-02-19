// import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard/Dashboard"
import Vehicles from "./pages/Vehicles"
import Stickers from "./pages/Stickers"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgotPassword"
// import Test from "./pages/Test"
import PrivateRoutes from "./components/util/PrivateRoutes"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="auth/signin" element={<SignIn />} />
        <Route path="auth/forgot-password" exact element={<ForgotPassword />} />
        <Route path="auth/signup" exact element={<SignUp />} />
        {/* <Route path="/Test" exact element={<Test />} /> */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/vehicles" exact element={<Vehicles />} />
          <Route path="/stickers" exact element={<Stickers />} />
          <Route path="/profile" exact element={<Profile />} />
          
        </Route>
        //TODO: Handle not found routes
        {/* <Route path="*" element={`<div>404 Not found<div/>`} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

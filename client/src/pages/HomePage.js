import React,{useEffect} from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const {user,setUser} = useUserContext();
  useEffect(() => {
    const userexist = localStorage.getItem("user");
    if(Object.keys("user").length ==0)
    logout();
    if(userexist){
      const parseUserData = JSON.parse(userexist);
      setUser(parseUserData);
      return;
    }
    console.log(user?.family_name);
  }, [user])
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem("user");
    setUser({});
    navigate("/register");
  }
  return <div><h1>HomePage 
  welcome {user?.given_name}</h1>
  <button onClick={logout}>
    LogOut
  </button>
  </div>;
}

export default HomePage;

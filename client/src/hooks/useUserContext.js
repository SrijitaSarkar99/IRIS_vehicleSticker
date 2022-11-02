import {userContext} from "../context"
import { useContext } from "react";
export const useUserContext = () =>{
    return useContext(userContext);
}
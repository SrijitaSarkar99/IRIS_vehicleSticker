import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`/login`, data);
  };
 // return axios.post(`${base}/login`, data);
  static Register = (data) => {
    return axios.post(`/signup`, data);
  };

  // static Logout = (data) => {
  //   return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  // };
}

// let base = "";

export default AuthApi;

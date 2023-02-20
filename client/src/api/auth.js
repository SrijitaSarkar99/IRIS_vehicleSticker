import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`/login`, data ,{ headers : { "Content-Type" : `application/json`}});
  };
 // return axios.post(`${base}/login`, data);
  static Register = (data) => {
    return axios.post(`/signup`, data );
  };

  static Logout = (data) => {
    // return axios.post(`/logout`, data, { headers: { Authorization: `${data.token}` } });
    return axios.get(`/logout`,data );
  };

  static GETUSERBYID =(data) => {
    return axios.get(`/users/${data.userId}`,{ headers: { Authorization: `Bearer ${data.token}` } })
  }
  static GETUSERVEHICLE = (data) => {
    return axios.get(`/vehicles?user_id=${data.userId}`,{ headers: { Authorization: `Bearer ${data.token}` } })
  }

  static GETUSERSTICKERS = (data) => {
    return axios.get(`/stickers?user_id=${data.userId}`,{ headers: {  Authorization: `Bearer ${data.token}` } })
  }

  static ADDVEHICLE = (data, user) => {
    return axios.post(`/vehicles`, data, { headers: { Authorization: `Bearer ${user.token}` } });
  };

  static ADDSTICKER = (data, user) => {
    return axios.post(`/stickers`, data, { headers: { Authorization: `Bearer ${user.token}` } });
  };

  static GETALLDEPARTMENTS = () => {
    return axios.get(`/departments`)
  }

  static UpdateUser = (data,user) => {
    return axios.patch(`/users/${user.userId}`, data, { headers: { Authorization: `Bearer ${user.token}` } });
  };

  static ResetPassword = (data, user) => {
    return axios.post(`/resetPassword`, data, { headers: { "Content-Type": "application/json"}});
  };

  static ForgotPassword = (data) => {
    return axios.get(`/resetPassword?email=${data}`);
  };


}



// let base = "";

export default AuthApi;

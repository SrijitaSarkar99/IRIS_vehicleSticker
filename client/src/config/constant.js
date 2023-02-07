// let BACKEND_SERVER = "http://localhost:5000/";
let BACKEND_SERVER = null;
if (process.env.REACT_APP_BACKEND_SERVER) {
  BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
  BACKEND_SERVER = "http://localhost:5000";
}

const API_SERVER = BACKEND_SERVER;
export default API_SERVER;
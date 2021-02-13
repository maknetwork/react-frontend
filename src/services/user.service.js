import axios from "axios";
import authHeader from "./auth-header";
const user = JSON.parse(localStorage.getItem("user"));

const API_URL = process.env.REACT_APP_EXPRESS_URL + "/api/users/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + user.user._id, { headers: authHeader() });
  }
}

export default new UserService();

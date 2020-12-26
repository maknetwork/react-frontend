import axios from "axios";

const API_URL = "http://localhost:9000/auth/signin/";

class AuthService {
  login(email, password) {
    return axios
      .post("http://localhost:9000/auth/signin/", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post("http://localhost:9000/api/users/", {
      name,
      email,
      password,
    });
  }

  getCurrentUser() {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("user"))
      return JSON.parse(localStorage.getItem("user"));
    else return false;
  }
}

export default new AuthService();

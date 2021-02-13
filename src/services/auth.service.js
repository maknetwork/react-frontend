import axios from "axios";

class AuthService {
  login(email, password) {
    return axios
      .post(process.env.REACT_APP_EXPRESS_URL + "/auth/signin/", {
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
    return axios.post(process.env.REACT_APP_EXPRESS_URL + "/api/users/", {
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

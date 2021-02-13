import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_EXPRESS_URL + "/api/dashboard/";
const user = JSON.parse(localStorage.getItem("user"));

class GetData {
  getPublicContent() {
    return axios.get(API_URL, {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
      Host: "localhost:9000",
    });
  }
  getPostsContent() {
    return axios.get(
      process.env.REACT_APP_EXPRESS_URL + "/api/dashboard/posts",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Host: "localhost:9000",
      }
    );
  }
  getComplaintContent(userId, complaintId) {
    return axios.get(
      process.env.REACT_APP_EXPRESS_URL +
        "/api/dashboard/complaint/" +
        userId +
        "/" +
        complaintId,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Host: "localhost:9000",
      }
    );
  }
  delUser(userId) {
    return axios.get(
      process.env.REACT_APP_EXPRESS_URL +
        "/api/dashboard/delete/user/" +
        userId,
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Host: "localhost:9000",
      }
    );
  }
}

export default new GetData();

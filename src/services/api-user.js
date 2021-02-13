const user = JSON.parse(localStorage.getItem("user"));

const read = async () => {
  try {
    let response = await fetch(
      process.env.REACT_APP_EXPRESS_URL + "/api/users/" + user.user._id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Host: "localhost:9000",
        },
      }
    );
    const movies = await response.json();
    return movies;
  } catch (err) {
    alert(err);
  }
};

export default read;

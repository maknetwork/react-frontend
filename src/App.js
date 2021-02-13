import React, { Component, Suspense } from "react";
import Button from "@material-ui/core/Button";
import "./App.css";
import MiniDrawer from "./appBar2";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import PrivateRoute from "./services/PrivateRoute";
import { lightBlue, red } from "@material-ui/core/colors";

import CircularProgress from "@material-ui/core/CircularProgress";
const Dashboard = React.lazy(() => import("./components/dashboard.component"));
const NewUser = React.lazy(() => import("./components/newUser.component"));
const Users = React.lazy(() => import("./components/users.component"));
require("dotenv").config();
const Login = React.lazy(() => import("./components/login.component"));
const Register = React.lazy(() => import("./components/register.component"));
const Profile = React.lazy(() => import("./components/profile.component"));
const Loginv2 = React.lazy(() => import("./components/loginv2.component"));
const Home = React.lazy(() => import("./components/home.component"));
const Posts = React.lazy(() => import("./components/posts.component"));
const Complaint = React.lazy(() => import("./components/complaint.component"));

//Get the default connection

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#FDD835",
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      darkState: true,
      theme: true,
      currentUser: undefined,
      light: {
        palette: {
          type: "light",
        },
      },
      dark: {
        palette: {
          /*   palette: {
          type: "dark",
          primary: {
            main: "#000000",
            light: "#52057b",
          },
          secondary: {
            main: "#bc6ff1",
          },
          background: {
            default: "#52057b",
            paper: "#892cdc",
          },
        }, */
          type: "dark",
          primary: {
            light: "#CECADF",
            main: "#5A4E93",
            dark: "#2E2564",
          },
          secondary: {
            light: "#B3EBD6",
            main: "#00BC77",
            dark: "#009747",
            contrastText: "#FFFFFF",
          },
          background: {
            paper: "#22184B",
            default: "#180F3D",
          },
          error: red,
        },
        status: {
          danger: "orange",
        },
      },
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleThemeChange() {
    if (localStorage.getItem("theme") !== null) {
      if (localStorage.getItem("theme") === "false") {
        localStorage.setItem("theme", true);
      } else {
        localStorage.setItem("theme", false);
      }
    }
    this.setState({ theme: !this.state.theme });
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }
  logOut() {
    AuthService.logout();
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    const localTheme = JSON.parse(window.localStorage.getItem("theme"));
    if (localTheme) {
      this.setState({ theme: localTheme });
    }
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    const { currentUser } = this.state;

    return (
      <ThemeProvider
        theme={createMuiTheme(
          this.state.theme ? this.state.light : this.state.dark
        )}
      >
        <div className="App">
          <MiniDrawer
            themer={this.state.theme}
            handleThemeChange={this.handleThemeChange}
            currentUser={this.state.currentUser}
            greeting={
              <div class="bodyContainer">
                {" "}
                <Suspense
                  fallback={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 100,
                        height: 100,
                        margin: 0,
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  }
                >
                  <Switch>
                    <PrivateRoute
                      exact
                      path={["/", "/home"]}
                      component={Home}
                    />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                    <Route exact path="/newmember" component={NewUser} />
                    <PrivateRoute exact path="/users" component={Users} />
                    <PrivateRoute exact path="/posts" component={Posts} />
                    <PrivateRoute
                      exact
                      path="/Complaint/:userId/:complaintId"
                      component={Complaint}
                    />

                    <Route exact path="/loginv2" component={Loginv2} />
                  </Switch>
                </Suspense>
              </div>
            }
          />

          {/*
      <header className="App-header">
       
         <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
    </li> *
      </header> */}
        </div>{" "}
      </ThemeProvider>
    );
  }
}

export default App;

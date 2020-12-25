import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/Lock";
import Box from "@material-ui/core/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Switch } from "formik-material-ui";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import AuthService from "../services/auth.service";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grow from "@material-ui/core/Grow";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function GrowTransition(props) {
  return <Grow {...props} />;
}

export default class Loginv2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      errormsg: "",
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick() {
    this.setState({ open: true });
  }
  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    return (
      <Paper elevation={2}>
        {this.state.loading ? <LinearProgress /> : <p></p>}
        <React.Fragment></React.Fragment>
        <Container maxWidth="lg">
          <Box>
            <h1 style={{ textAlign: "center" }}>Login to your account</h1>
          </Box>{" "}
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({ loading: true });
              AuthService.login(values.email, values.password).then(
                () => {
                  alert("logged in");
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  this.setState({ errormsg: resMessage });
                  this.setState({ open: true });
                  this.setState({ loading: false });

                  setSubmitting(false);
                }
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box m={2}>
                  <Field
                    component={TextField}
                    type="email"
                    name="email"
                    variant="outlined"
                    label="Email"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box m={2}>
                  <Field
                    component={TextField}
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                  <ErrorMessage name="password" component="div" />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        type="checkbox"
                        name="rememberMe"
                      />
                    }
                    label="Remember Me"
                  />
                </Box>

                <Box m={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "100%" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Log In
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box m={2}>
            <Button color="primary">
              <LockIcon color="primary" /> Forgot password?
            </Button>
          </Box>
        </Container>
        <Snackbar
          open={this.state.open}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          TransitionComponent={GrowTransition}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            {this.state.errormsg}
          </Alert>
        </Snackbar>
      </Paper>
    );
  }
}

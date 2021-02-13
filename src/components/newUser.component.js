import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/Lock";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";

import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch,
} from "formik-material-ui";
import Container from "@material-ui/core/Container";
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
} from "formik-material-ui-pickers";
import { RadioGroup } from "formik-material-ui";

import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FormLabel from "@material-ui/core/FormLabel";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
export default class NewUser extends Component {
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Paper elevation={2}>
          {" "}
          <Formik
            initialValues={{ email: "", password: "", date: new Date() }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.phoneno) {
                errors.phoneno = "Required";
              } else if (
                !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
                  values.phoneno
                )
              ) {
                errors.phoneno = "Invalid phone number";
              } else if (values.phoneno.length !== 10) {
                errors.phoneno = "Please enter valid phone number.";
              }
              if (!values.Gender) {
                errors.Gender = "Required";
              }
              if (!values.fullName) {
                errors.fullName = "Required";
              }
              if (!values.date) {
                errors.date = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              this.setState({ loading: true });
              /* 
                AuthService.login(values.email, values.password).then(
                  () => {
                    this.props.history.push("/profile");
                    window.location.reload();
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
              */
            }}
          >
            {({ isSubmitting }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form>
                  <Grid container spacing={2} style={{ padding: 10 }}>
                    <Grid item xs={12} sm={6}>
                      <div style={{ padding: 10 }}>
                        <h2>
                          {" "}
                          <AccountBoxIcon /> Details
                        </h2>
                        <Divider />

                        <Box m={2}>
                          <Field
                            component={TextField}
                            type="text"
                            name="fullName"
                            variant="standard"
                            required
                            label="Full Name"
                            style={{ width: "80%" }}
                          />
                        </Box>

                        <Box margin={2}>
                          <Field
                            component={DatePicker}
                            name="date"
                            required
                            label="Date of Birth"
                          />
                        </Box>
                        <Box margin={2}>
                          <Field component={RadioGroup} name="Gender">
                            <FormLabel component="legend" required>
                              Gender
                            </FormLabel>
                            <div style={{ display: "inline-block" }}>
                              <FormControlLabel
                                value="male"
                                control={<Radio disabled={isSubmitting} />}
                                label="Male"
                                disabled={isSubmitting}
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio disabled={isSubmitting} />}
                                label="Female"
                                disabled={isSubmitting}
                              />{" "}
                            </div>
                          </Field>
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
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div style={{ padding: 10 }}>
                        <h2>
                          {" "}
                          <PhoneAndroidIcon /> Contact
                        </h2>
                        <Divider />

                        <Box m={2}>
                          <Field
                            component={TextField}
                            type="email"
                            name="email"
                            variant="standard"
                            label="Email"
                            style={{ width: "80%" }}
                          />
                        </Box>

                        <Box m={2}>
                          <Field
                            component={TextField}
                            type="tel"
                            name="phoneno"
                            variant="standard"
                            required
                            label="Phone no"
                            style={{ width: "80%" }}
                          />
                        </Box>
                        <Box m={2}>
                          <Field
                            component={TextField}
                            type="tel"
                            name="alternatephoneno"
                            variant="standard"
                            label="Alternate cell"
                            style={{ width: "80%" }}
                          />
                        </Box>
                        <Box m={2}>
                          <Field
                            component={TextField}
                            type="text"
                            name="address"
                            variant="standard"
                            label="Address"
                            style={{ width: "80%" }}
                          />
                        </Box>
                      </div>
                    </Grid>
                  </Grid>{" "}
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </Paper>{" "}
      </div>
    );
  }
}

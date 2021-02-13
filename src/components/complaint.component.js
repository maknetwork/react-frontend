import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import red from "@material-ui/core/colors/red";
import CancelIcon from "@material-ui/icons/Cancel";
import GetData from "../services/get-data.service";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "@material-ui/core/Button";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      open: false,
      windowWidth: window.innerWidth,
    };
  }
  toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  };
  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    const receivedData = await GetData.getComplaintContent(
      this.props.match.params.userId,
      this.props.match.params.complaintId
    );
    var data = receivedData.data.data.users;

    this.setState({ users: data, loading: false });
  }
  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    const { users } = this.state;
    const { windowWidth } = this.state;

    console.log("this is log", this.props.match.params);
    return (
      <div className="container" style={{ padding: 20 }}>
        <Paper elevation={1} style={{ padding: 20 }}>
          <Typography variant="h6" component="h5">
            Report
          </Typography>{" "}
          <div style={{ marginTop: 20 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  FSR NO.:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  <Chip
                    label={users.fsrNo}
                    variant="outlined"
                    color="primary"
                  />
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5" align="center">
                  Date:&nbsp;
                </Typography>
                {users.length !== 0 && (
                  <Typography
                    variant="body1"
                    component="h5"
                    color="textSecondary"
                  >
                    {this.toDateTime(
                      users.timestamp.seconds
                    ).toLocaleDateString()}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  Warranty Status.:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.warrantyStatus}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  Complaint Status:&nbsp;
                </Typography>
                {users.completed ? (
                  <Chip label="Completed" color="primary" icon={<DoneIcon />} />
                ) : (
                  <Chip
                    label="Pending"
                    color="secondary"
                    icon={<CancelIcon />}
                  />
                )}
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: 10 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={6}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  Customer name & address:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.address}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5" align="center">
                  Customer Contact No.:&nbsp;
                </Typography>
                {users.length !== 0 && (
                  <Typography
                    variant="body1"
                    component="h5"
                    color="textSecondary"
                  >
                    {users.contactNumber}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div style={{ marginTop: 20 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  Unit Model No:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.unitModelno}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5" align="center">
                  Unit Serial No.:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.unitSerialno}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  OEM Name:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.oemName}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <div></div>
          <div>
            <Grid container spacing={3}>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              ></Grid>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              ></Grid>
              <Grid
                item
                xs={4}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  OEM Model No.:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.oemModelno}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  Selected Problem:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.selectedProblem}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ flexDirection: "row", display: "inline-flex" }}
              >
                <Typography variant="body1" component="h5">
                  Comments:&nbsp;
                </Typography>
                <Typography
                  variant="body1"
                  component="h5"
                  color="textSecondary"
                >
                  {users.comment}
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div style={{ marginTop: 10 }}>
            <Typography variant="h6" component="h5">
              Images Attached{" "}
            </Typography>
            {users.length !== 0 &&
              users.imagePaths.map((object, i) => (
                <Button
                  key={i}
                  onClick={() => {
                    window.open(object);
                  }}
                >
                  <Paper elevation={2}>
                    <LazyLoadImage
                      alt=""
                      height="auto"
                      key={i}
                      src={object} // use normal <img> attributes as props
                      width="300"
                    />
                  </Paper>
                </Button>
              ))}
          </div>
        </Paper>
      </div>
    );
  }
}

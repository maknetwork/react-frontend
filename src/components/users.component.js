import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import GetData from "../services/get-data.service";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grow from "@material-ui/core/Grow";
import RefreshIcon from "@material-ui/icons/Refresh";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const columns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
  { field: "email", headerName: "Email", width: 230 },
  { field: "mobileNo", headerName: "Mobile No", width: 200 },
];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selected: [],
      loading: true,
      serverLoading: false,
      open: false,
      success: false,
      currentUser: undefined,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  async componentDidMount() {
    const receivedData = await GetData.getPublicContent();
    var data = receivedData.data.data.users;

    this.setState({ users: data, loading: false });
  }
  async deleteUser() {
    this.setState({ open: false, serverLoading: true });

    const arr = this.state.selected;

    for (var i = 0; i < arr.length; i++) {
      var receivedData = await GetData.delUser(arr[i]);
      console.log(" the receive ", receivedData);
      if (receivedData.data.success) {
        this.setState({ success: true });
      } else {
        this.setState({ success: false });
      }
    }
    this.setState({ serverLoading: false });
    this.setState({ loading: true });

    const newData = await GetData.getPublicContent();
    var data = newData.data.data.users;

    this.setState({ users: data, loading: false });
  }

  async handleRefresh() {
    this.setState({ loading: true });
    const newData = await GetData.getPublicContent();
    var data = newData.data.data.users;

    this.setState({ users: data, loading: false });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { users } = this.state;

    return (
      <div style={{ padding: 20 }}>
        <Backdrop
          style={{ zIndex: 91, color: "#fff" }}
          open={this.state.serverLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete selected Users?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Continuing will permanently delete these users from the database.
              Press agree only when you are sure.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.deleteUser} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Paper elevation={1} style={{ padding: 20 }}>
          <div>
            <div style={{ flexDirection: "row", display: "inline-flex" }}>
              {" "}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                style={{ borderRadius: 0, marginLeft: 10 }}
                onClick={this.handleRefresh}
                startIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
              {this.state.selected.length > 0 && (
                <Grow in={true}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    style={{ borderRadius: 0 }}
                    onClick={this.handleClickOpen}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Grow>
              )}
            </div>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={20}
              onSelectionChange={(param) =>
                this.setState({ selected: param.rowIds })
              }
              loading={this.state.loading}
              ColumnMenu={<h1>sad</h1>}
              autoHeight={true}
              checkboxSelection
            />
          </div>
        </Paper>
        {this.state.success && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={true}
            autoHideDuration={3000}
            key={1}
          >
            <Alert severity="success">
              Successfully deleted selected users
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

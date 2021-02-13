import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/Lock";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import read from "../services/api-user";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import GetData from "../services/get-data.service";
import Chip from "@material-ui/core/Chip";

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
const columns = [
  { field: "fsrNo", headerName: "FSR No", width: 130 },
  { field: "unitModelno", headerName: "Unit Model No", width: 130 },
  { field: "address", headerName: "Address", width: 320 },
  { field: "unitSerialno", headerName: "Unit Serial No", width: 130 },
  {
    field: "completed",
    headerName: "Completed",
    width: 100,
  },
  {
    field: "date",
    type: "dateTime",
    width: 220,
    headerName: "Date and Time",
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      currentUser: undefined,
    };
  }

  async componentDidMount() {
    read().then((movies) => {
      this.setState({ currentUser: JSON.stringify(movies) });
    });
    const receivedData = await GetData.getPostsContent();
    var data = receivedData.data.data.users;

    this.setState({ users: data, loading: false });
  }
  render() {
    const { users } = this.state;
    console.log("The date is ", JSON.stringify(new Date(1979, 0, 1)));
    return (
      <div style={{ padding: 20 }}>
        <Paper elevation={1} style={{ padding: 20 }}>
          <div>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={20}
              loading={this.state.loading}
              showToolbar
              onRowClick={(param) =>
                window.open(
                  "/complaint/" + param.row.userId + "/" + param.row.complaintId
                )
              }
              showCellRightBorder={true}
              sortModel={[
                {
                  field: "date",
                  sort: "desc",
                },
              ]}
              autoHeight={true}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

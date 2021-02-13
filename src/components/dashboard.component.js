import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/Lock";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import read from "../services/api-user";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardContent>
                <h2>Current Members</h2>
                <br />
                {'"a benevolent smile"'}
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe">
                    {currentUser.user.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title="Welcome"
                subheader={
                  currentUser.user.name.charAt(0).toUpperCase() +
                  currentUser.user.name.slice(1)
                }
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                Word of the Day adjective well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                Word of the Day adjective well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

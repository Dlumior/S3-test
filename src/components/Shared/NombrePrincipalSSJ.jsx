import React, { Component } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  withStyles,
  Button,
  Paper,
} from "@material-ui/core";
import { compose } from "recompose";

const estilos = {
  paper: {
    backgroundColor: "#ffffff",
  },
};
class NombrePrincipalSSJ extends Component {
  render() {
    return (
      <Paper style={estilos.paper}>
        <Grid container spacing={0}>
          <Grid item md={8}>
            <Typography component="h1" variant="h5">
              <h2>{this.props.titulo}</h2>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <h1></h1>
          </Grid>
          

        </Grid>
      </Paper>
    );
  }
}

export default NombrePrincipalSSJ;

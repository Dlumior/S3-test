import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid } from "@material-ui/core";
const styles ={
    control:{
        textAlign:"center"
    }
}
class Controles extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
          <Grid container spacing={6} alignContent="center">
              <Grid item md={3} xs={5}>
          <h2 style={styles.control}>
            <IconButton color="primary" aria-label="delete">
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            Mes
            <IconButton color="primary" aria-label="delete">
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </h2>
        </Grid>
        <Grid item md={6} xs={5}></Grid>
        <Grid item md={3} xs={5}>
          <h2 style={styles.control}>
            <IconButton color="primary" aria-label="delete">
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            Semana
            <IconButton color="primary" aria-label="delete">
              <ArrowForwardIosOutlinedIcon />
            </IconButton>
          </h2>
        </Grid>
          </Grid>
        
      </div>
    );
  }
}

export default Controles;

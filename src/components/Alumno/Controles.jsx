import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid } from "@material-ui/core";
const styles = {
  control: {
    textAlign: "center",
  },
};
class Controles extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleBack(e) {
    console.log("click atras");
  }
  handleFordward(e) {
    console.log("click adelante");
  }
  render() {
    return (
      <div>
        <Grid container spacing={6} alignContent="center">
          <Grid item md={3} xs={5}>
            <h1 style={styles.control}>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={this.handleBack}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              {this.props.mes || "Mes Actual"}
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={this.handleFordward}
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </h1>
          </Grid>
          <Grid item md={6} xs={5}></Grid>
          <Grid item md={3} xs={5}>
            <h1 style={styles.control}>
              <IconButton color="primary" aria-label="delete" onClick={this.handleBack}>
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              {"Semana " + this.props.semana || "Semana Actual"}
              <IconButton color="primary" aria-label="delete" onClick={this.handleFordward}>
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </h1>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Controles;

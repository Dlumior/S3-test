import React, { Component } from "react";
import ImagenCircular from "../Shared/ImagenCircular";
import { Grid, Chip, Paper } from "@material-ui/core";
const styles = {
  paper: {
    marginTop: "10%",
    marginLeft: "3%",
    marginRight: "3%",
    flexDirection: "column",
    backgroundImage: "",
  },
  chip: {
    textAlign: "center"
  }
};
class DisponibilidadCard extends Component {
  render() {
    return (
      <div >
        <Paper elevation={3} style={styles.paper}>
          <Grid container spacing={2} alignContent="center" style={styles.chip}>
            <Grid item md={4} xs={4}>
              <ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" />
            </Grid>
            <Grid item md={8} xs={8} >
              <p>Nombre del Tutor</p>
            </Grid>
            
              <Grid item md={6} textAling="center" style={styles.chip}>
                <Chip label="Hora inicio" color="primary" clickable />
              </Grid>
              <Grid item md={6} style={styles.chip}>
                <Chip label="Hora fin" color="primary" clickable />
              </Grid>
            
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default DisponibilidadCard;

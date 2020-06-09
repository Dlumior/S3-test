import React, { Component } from "react";
import ImagenCircular from "../Shared/ImagenCircular";
import { Grid, Chip, Paper } from "@material-ui/core";
const styles = {
  paper: {
    marginTop: "2%",
    flexDirection: "column",
    backgroundImage: "",
    borderTop: "2px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
  chip: {
    textAlign: "center",
  },
};
class DisponibilidadCard extends Component {
  render() {
    const disponibilidad = this.props.disponibilidad;
    return (
      <>
        <Paper style={styles.paper}>
          <Grid container spacing={2} style={styles.chip}>
            <Grid item md={4} xs={4}>
              <ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" />
            </Grid>
            <Grid item md={8} xs={8}>
              <p>
                {disponibilidad.TUTOR.USUARIO.NOMBRE +
                  " " }
                  </p>
                  
                  <p>
                  {
                  disponibilidad.TUTOR.USUARIO.APELLIDOS}
              </p>
            </Grid>

            <Grid item md={6} textAling="center" style={styles.chip}>
              <Chip
                label={disponibilidad.HORA_INICIO}
                color="primary"
                clickable
              />
            </Grid>
            <Grid item md={6} style={styles.chip}>
              <Chip label={disponibilidad.HORA_FIN} color="primary" clickable />
            </Grid>
          </Grid>
        </Paper>
        <br />
      </>
    );
  }
}

export default DisponibilidadCard;

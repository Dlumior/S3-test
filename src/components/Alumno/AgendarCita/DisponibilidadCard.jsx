import React, { Component } from "react";
import { Grid, Chip, Paper, Typography, Button } from "@material-ui/core";
import ImagenCircular from "../../Shared/ImagenCircular";
const styles = {
  paper: {
    borderTop: "3px solid #3AAFA9",
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
          {/** Encabezado Imagen y nombre */}
          <Grid container spacing={2} style={styles.chip}>
            <Grid item md={3} xs={3}>
              <ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" />
            </Grid>
            <Grid item md={9} xs={9}>
              <Typography
                variant="button"
                component="h4"
                style={styles.control}
                display="block"
                gutterBottom
              >
                {disponibilidad.TUTOR.USUARIO.NOMBRE + " "}
              </Typography>
              <Typography
                variant="button"
                component="h3"
                style={styles.control}
                display="block"
                gutterBottom
              >
                {disponibilidad.TUTOR.USUARIO.APELLIDOS}
              </Typography>
            </Grid>
          </Grid>
          {/* Las horas */}
          <Grid container spacing={0} alignContent='stretch'>
            <Grid item md={6} xs={6}>
              <Typography
                variant="button"
                component="h2"
                style={styles.chip}
                display="block"
                gutterBottom
              >
                <strong>Hora Inicio</strong>
              </Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Chip
                label={disponibilidad.HORA_INICIO}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={6}>
              <Typography
                variant="button"
                component="h2"
                style={styles.chip}
                display="block"
                gutterBottom
              >
                <strong>Hora Fin</strong>
              </Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Chip
                label={disponibilidad.HORA_FIN}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Grid>
            {/**fin minicontainer */}
          </Grid>
          
        </Paper><br/>
      </>
    );
  }
}

export default DisponibilidadCard;

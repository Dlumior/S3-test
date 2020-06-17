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

class SesionesCard extends Component {
  render() {
    const cita = this.props.cita;
    console.log(cita);
    return (
      <>
        <Paper style={styles.paper}>

          {/** Encabezado Imagen y nombre */}
          <Grid container spacing={2} style={styles.chip}>
            {/** IMAGEN  */}
            <Grid item md={3} xs={3}>
              <ImagenCircular src="https://pics.me.me/honk-this-we-live-in-a-clown-world-folks-55670983.png" />
            </Grid>
            
            {/** NOMBRE-APELLIDOS  */}
            <Grid item md={9} xs={9}>
              <Typography
                variant="button"
                component="h5"
                style={styles.control}
                display="block"
                gutterBottom
              >
                {"ALUMNO:" + cita.ALUMNOs[0].USUARIO.NOMBRE.split()[0] + " " + cita.ALUMNOs[0].USUARIO.APELLIDOS.split()[0]}
              </Typography>
            </Grid>

          </Grid>

          {/* Las horas */}
          <Grid container spacing={0} alignContent='center'>
            <Grid item md={6} xs={6}>
              <Chip
                label={cita.HORA_INICIO}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <Chip
                label={cita.HORA_FIN}
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

export default SesionesCard;

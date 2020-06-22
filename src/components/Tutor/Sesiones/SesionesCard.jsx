import React, { Component } from "react";
import { Grid, Chip, Paper, Typography, Button, Dialog } from "@material-ui/core";
import ImagenCircular from "../../Shared/ImagenCircular";
import RevisarSesion from "./RevisarSesion";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const styles = {
  paper1: {
    borderTop: "3px solid #3AAFA9",
    backgroundColor: "#cccccc",
  },
  paper2: {
    borderTop: "3px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
  chip: {
    textAlign: "center",
  },
};

class SesionesCard extends Component {

  
  constructor() {
    super();
    this.state = {
      tutores: {
        columns: [{
          title: "Nombre",
          field: "nombre",
        }],
        data: [{ nombre: "" }]
      }, //aqui va el nombre de la tablilla
      open: false,

    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);

   
  };

//=============================================================
handleOnClick() {
  this.setState({ open: true });
}

handleOnClose() {
  this.setState({ open: false });
}

  render() {
    const cita = this.props.cita;
    console.log("PERRO", cita.ESTADO);
    // si es que es pospuesta o futura
    if (cita.ESTADO.includes("03") || cita.ESTADO.includes("04")) { 
      return (
        <>
          <Button
            onClick={this.handleOnClick}
          >
          <Paper style={styles.paper2}>
  
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
            
          </Paper>
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleOnClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
  
              <RevisarSesion cita={this.props.cita}
                fexaForm={this.props.fexaForm}   />
  
            </DialogContent>
  
            <DialogActions>
              
            </DialogActions>
          </Dialog>
  
          <br/>
        </>
      );
    } else {
      return (
        <>
          <Button
            onClick={this.handleOnClick}
          >
          <Paper style={styles.paper1}>
  
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
            
          </Paper>
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleOnClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
  
              <RevisarSesion cita={this.props.cita}
                fexaForm={this.props.fexaForm}   />
  
            </DialogContent>
  
            <DialogActions>
              
            </DialogActions>
          </Dialog>
  
          <br/>
        </>
      );
    }
  }
}

export default SesionesCard;

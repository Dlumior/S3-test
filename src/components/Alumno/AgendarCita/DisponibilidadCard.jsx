import React, { Component } from "react";
import { Grid, Chip, Paper, Typography, Button, Dialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ImagenCircular from "../../Shared/ImagenCircular";
import FrmDialogoSolicitarTutor from "../FrmDialogoSolicitarTutor.js";

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
  //static contextType = UserContext;

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
    //console.log("ctm",this.state.openSolicitarTutor);
    this.setState({ open: false });
  }

  


  render() {
    const disponibilidad = this.props.disponibilidad;
    return (
      <>
        <Button
          onClick={this.handleOnClick}

        >
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
                  {disponibilidad.TUTOR.USUARIO?.NOMBRE + " "}
                </Typography>
                <Typography
                  variant="button"
                  component="h3"
                  style={styles.control}
                  display="block"
                  gutterBottom
                >
                  {disponibilidad.TUTOR.USUARIO?.APELLIDOS}
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
                  label={disponibilidad?.HORA_INICIO}
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
                  label={disponibilidad?.HORA_FIN}
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

            <FrmDialogoSolicitarTutor dispo={this.props.disponibilidad}
              fexaForm={this.props.fexaForm}   />

          </DialogContent>

          <DialogActions>
            
          </DialogActions>
        </Dialog>

        <br />
      </>
    );
  }
}

export default DisponibilidadCard;

import React, { Component } from "react";
import {Grid,Chip,Paper,Typography,Button,Dialog,} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ImagenCircular from "../../Shared/ImagenCircular";
//import FrmDialogoSolicitarTutor from "../FrmDialogoSolicitarTutor.js"; //no lo necesita.. boton disable

const styles = {
  paper: {
    borderTop: "3px solid #3AAFA9",
    backgroundColor: "#ffffff",
  },
  chip: {
    textAlign: "center",
  },
};

class DisponibilidadCardTutoriaFija extends Component {
  //static contextType = UserContext;
  constructor() {
    super();
    this.state = {
      tutores: {
        columns: [
          {
            title: "Nombre",
            field: "nombre",
          },
        ],
        data: [{ nombre: "" }],
      }, //aqui va el nombre de la tablilla
      open: false,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }
  //=============================================================
  handleOnClick() {
    this.setState({ open: true });
  }
  handleOnClose() {
    ////console.log("ctm",this.state.openSolicitarTutor);
    this.setState({ open: false });
  }

  render() {
    const disponibilidad = this.props.disponibilidad;
    return (
      <>
        {/*<Button onClick={this.handleOnClick}>*/}
          <Paper style={styles.paper}>
            {/** Encabezado Imagen y nombre */}
            <Grid container spacing={0}>
              <Grid container spacing={0}>
                <Grid item md={3} xs={3}>
                {
                  disponibilidad.TUTOR.USUARIO.IMAGEN ? (
                    <ImagenCircular
                      src={`data:image/jpeg;base64,${disponibilidad.TUTOR.USUARIO.IMAGEN}`}
                    />
                  ) : (
                      <ImagenCircular
                        square={true}
                        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/deadline-calendar-date-schedule-timeline-33430.png"
                      />
                    )
                }
                  {/* <ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" /> */}
                </Grid>
                <Grid item md={9} xs={9}>
                  <Grid item md={12} xs={12}>
                    <Typography component="paragraph">
                      {disponibilidad.TUTOR.USUARIO?.NOMBRE + " "}
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography component="paragraph">
                      {disponibilidad.TUTOR.USUARIO?.APELLIDOS}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/** horas */}
              <Grid container spacing={0}>
                <Grid item md={1} xs={1} />
                <Grid item md={1} xs={1}>
                  <Typography
                    variant="button"
                    component="h4"
                    style={styles.chip}
                    display="block"
                    gutterBottom
                  >
                    <strong style={styles.chip}>De:</strong>
                  </Typography>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Chip
                    label={disponibilidad?.HORA_INICIO}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={1} xs={1}>
                  <Typography
                    variant="button"
                    component="h4"
                    style={styles.chip}
                    display="block"
                    gutterBottom
                  >
                    <strong>A:</strong>
                  </Typography>
                </Grid>
                <Grid item md={4} xs={4}>
                  <Chip
                    label={disponibilidad?.HORA_FIN}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                  <Grid item md={1} xs={1} />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        {/*</Button>*/}

        {/**
         <Dialog
          open={this.state.open}
          onClose={this.handleOnClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <FrmDialogoSolicitarTutor
              dispo={this.props.disponibilidad}
              fexaForm={this.props.fexaForm}
              onCloseFrm ={this.handleOnClose}
            />
          </DialogContent>

          <DialogActions>        </DialogActions>
        </Dialog>
         */

        }        

        <br />
      </>
    );
  }
}

export default DisponibilidadCardTutoriaFija;

import React from "react";
import {
  Paper,
  Grid,
  Avatar,
  Button,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { POST } from "../../../Conexion/Controller";

const useStyles = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(3),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  },
  separacion: {
    margin: theme.spacing(1),
  },
  typoN: {
    textAlign: "left",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  typoF: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

const Solicitud = (props) => {
  const classes = useStyles();
  const { solicitud } = props;
  const [open, setOpen] = React.useState(false);
  const [icn, setIcn] = React.useState("success");
  const [msg, setMsg] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const datos = {
    ID_ASIGNACION: solicitud.ID_ASIGNACION,
    ID_ALUMNO: solicitud.ALUMNO.ID_ALUMNO,
    RESPUESTA: -1,
  };

  const enviarRespuesta = async () => {
    const sendData = {
      servicio: "/api/solicitud/modificar",
      request: { solicitud: datos },
    };
    //console.log("Accepting alumno:", datos);
    let modificacion = await POST(sendData);
    //console.log("Got updated alumno from back:", modificacion);
    //alert("Se actualizó correctamente el estado de la solicitud");
    if (modificacion.solicitud.RESPUESTA !== undefined) {
      setIcn("success");
      setMsg("Se actualizó correctamente el estado de la solicitud");
      handleClickOpen();
    } else {
      setIcn("error");
      setMsg("Se actualizó correctamente el estado de la solicitud");
      handleClickOpen();
    }
  };

  const hanldeAceptar = async () => {
    datos.RESPUESTA = 1;
    await enviarRespuesta();
  };

  const handleRechazar = async () => {
    datos.RESPUESTA = 0;
    await enviarRespuesta();
  };

  const mensaje = (icon, msg) => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Grid container md={12} justify="center">
          {icon === "error" ? (
            <>
              <ErrorIcon color="error"
                style={{ fontSize: 70 }} />
              {/* <Typography variant="subtitle2">Error</Typography> */}
            </>
          ) : (
              <>
                <CheckCircleIcon color="primary"
                  style={{ fontSize: 70 }} />
                {/* <Typography variant="subtitle2">Mensaje</Typography> */}
              </>
            )}
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {mensaje(icn, msg)}
      <Paper elevation={5} className={classes.caja}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={2}
            container
            justify="center"
            alignItems="center"
          >
            <Avatar className={classes.large} />
          </Grid>
          <Grid item xs={12} md={7} container direction="column">
            <Grid item>
              <Typography variant="h5" className={classes.typoN}>
                {solicitud.ALUMNO.USUARIO.NOMBRE}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.typoF}>
                {solicitud.ALUMNO.USUARIO.APELLIDOS}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={hanldeAceptar}
                >
                  Aceptar
                </Button>
              </Grid>
              <Grid item xs={6} md={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleRechazar}
                >
                  Rechazar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Solicitud;

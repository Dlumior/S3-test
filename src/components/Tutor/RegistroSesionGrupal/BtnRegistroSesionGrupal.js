import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid } from "@material-ui/core";
// import { getUser } from "../../../Sesion/Sesion";
// import { GET } from "../../../Conexion/Controller";
// import ComboBoxPrograma from "../ListarAlumnos/ComboBoxPrograma";
// import ComboBoxProcesoTutoria from "../ListarAlumnos/ComboBoxProcesoTutoria";
import TablaGrupoAlumnos from "./TablaGrupoAlumnos";
import ParseGrupoAlumno from "./ParseGrupoAlumno";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  caja: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    // width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BtnRegistroSesionGrupal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //console.log("cita\n================\n", props.cita);

  const [grupo, setGrupo] = useState(ParseGrupoAlumno(props.cita));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver alumnos
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Registro de resultados de sesiones grupales
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar
            </Button> */}
          </Toolbar>
        </AppBar>
        <Grid container justify="center" alignItems="center" spacing={4} style={{marginTop:"3%"}}>
          <Grid item xs={12} md={11}>
            <TablaGrupoAlumnos columns={grupo.columns} data={grupo.data} />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

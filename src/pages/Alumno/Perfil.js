import React from "react";
import Datos from "../../components/Alumno/Datos";
import { Grid, makeStyles } from "@material-ui/core";
import {getUser} from "../../Sesion/Sesion";
import ImgAlumno from "../../components/Alumno/alumno.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = () => {
  const classes = useStyles();
  return (
    <div>
      <CabeceraPerfil titulo="Alumno" 
                      nombre={getUser().usuario.APELLIDOS + ", " + getUser().usuario.NOMBRE}
                      imagen={ImgAlumno}
      />
      <Grid
        container
        xs={12}
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.customContainer}
      >
        <Grid item>
          <Datos />
        </Grid>
      </Grid>
    </div>
  );
};

export default Perfil;

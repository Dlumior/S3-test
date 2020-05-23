import React from "react";
import Datos from "../../components/Alumno/Datos";
import CabeceraShared from "../../components/Shared/CabeceraShared.js";
import { Grid, makeStyles } from "@material-ui/core";

import ImgAlumno from "../../components/Alumno/alumno.png";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = () => {
  const classes = useStyles();
  return (
    <div>
      <CabeceraShared titulo="Alumno" 
                      nombre="RODRIGUEZ GUTIERREZ, Stéfano André"
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

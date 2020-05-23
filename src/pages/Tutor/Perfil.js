import React from "react";

import Datos from "../../components/Tutor/Datos";
import CabeceraShared from "../../components/Shared/CabeceraShared.js";
import { Grid, makeStyles } from "@material-ui/core";

import ImgTutor from "../../components/Tutor/tutor.png";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = () => {
  const classes = useStyles();
  return (
    <div>
      <CabeceraShared titulo="Tutor" 
                      nombre="TORRES VERDES, Carlos Tomás"
                      imagen={ImgTutor}
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

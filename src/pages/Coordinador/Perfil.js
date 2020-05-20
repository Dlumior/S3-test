import React from "react";

import Datos from "../../components/Coordinador/Datos";
import Cabecera from "../../components/Coordinador/Cabecera.js";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = () => {
  const classes = useStyles();

  return (
    <div>
      <Cabecera />
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

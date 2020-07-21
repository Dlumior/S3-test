import React from "react";
import { Paper, TextField, Grid, Button, makeStyles } from "@material-ui/core";
import {getUser} from "../../Sesion/Sesion";

const useStyles = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(5),
    width: theme.spacing(150),
    height: theme.spacing(20),
  },
}));

const Datos = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.caja}>
      <Grid container xs={12} direction="column" spacing={2}>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              disabled
              margin="dense"
              id="name"
              label="Código"
              type="text"
              fullWidth
              defaultValue = {getUser().usuario.CODIGO}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              disabled
              margin="dense"
              id="name"
              label="Correo"
              type="email"
              fullWidth
              defaultValue = {getUser().usuario.CORREO}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Datos;

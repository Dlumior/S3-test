import React, { useState } from "react";
import { Paper, makeStyles, Grid, Typography, Fab } from "@material-ui/core";
import Dialogo from "./Dialogo.js";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dia: {
    width: theme.spacing(17),
    height: theme.spacing(15),
  },
}));



const handleClickOpen = (e,datos, setDatos) => {
  setDatos({
    ...datos,
      OPEN: true,
    });
};

const CuadroDia = (props) => {
  const { datos, setDatos } = props
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Paper className={classes.dia}>
          <Grid container>
            <Grid item xs={10}>
              <Typography align="center">dia</Typography>
            </Grid>
            <Grid item xs={2}>
              <Fab aria-label="add" size="small">
                <AddCircle onClick= {(e) => handleClickOpen(e, datos, setDatos)}/>
                <Dialogo datos={datos} setDatos={setDatos}/>
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default CuadroDia;

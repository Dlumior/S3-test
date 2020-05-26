import React from "react";
import { Paper, makeStyles, Grid, Typography, Fab } from "@material-ui/core";

import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dia: {
    width: theme.spacing(17),
    height: theme.spacing(15),
  },
}));

const CuadroDia = () => {
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
                <AddCircle />
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default CuadroDia;

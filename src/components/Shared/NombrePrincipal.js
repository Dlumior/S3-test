import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    backgroundColor: "#ffffff",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(),
    paddingLeft: theme.spacing(5),
  },
}));

const NombrePrincipal = (props) => {
  const classes = useStyles();
  const BotnReg = props.botonRegistrar;
  if (props.botonRegistrar) {
    return (
      <Grid container>
        <Grid item md={10} xs={12}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.customContainer}
          >
            <h2>{props.titulo}</h2>
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
          style={{ display: "flex", backgroundColor: "#ffffff" }}
        >
          <div style={{ marginTop: "20%" }}>
            <BotnReg />
          </div>
        </Grid>
      </Grid>
    );
  } else
    return (
      <Typography
        component="h1"
        variant="h5"
        className={classes.customContainer}
      >
        <h2>{props.titulo}</h2>
      </Typography>
    );
};

export default NombrePrincipal;

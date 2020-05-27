import React from "react";
import { makeStyles, Grid, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
}));

const NombrePrincipal = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        component="h4"
        variant="h4"
        className={classes.customContainer}
      >
        {props.titulo}
      </Typography>
    </div>
  );
};

export default NombrePrincipal;

import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

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

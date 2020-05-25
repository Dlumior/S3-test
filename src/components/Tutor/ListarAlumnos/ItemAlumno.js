import React from "react";
import {
  Grid,
  Typography,
  Button,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  separacion: {
    margin: theme.spacing(1),
  },
}));

const ItemAlumno = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.separacion}>
      <Grid item xs={1} container justify="center" alignItems="center">
        <Grid item>
          <Avatar
            alt={props.fullname}
            src={props.image}
            className={classes.large}
          />
        </Grid>
      </Grid>
      <Grid item xs={9} container direction="column">
        <Grid item>
          <Typography variant="subtitle1">{props.fullname}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{props.faculty}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={2} container justify="center" alignItems="center">
        <Button color="primary" variant="outlined">
          Ver perfil
        </Button>
      </Grid>
    </Grid>
  );
};

export default ItemAlumno;

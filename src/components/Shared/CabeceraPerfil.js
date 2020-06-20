import React from "react";
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: "500%",
  },
  customContainer: {
    padding: theme.spacing(5),
    backgroundColor: "#ffffff",
  },
}));

const CabeceraPerfil = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xl" className={classes.customContainer}>
        <Grid container>
          <Grid item xs={2} container justify="center" alignItems="center">
            <Avatar
              alt={props.nombre}
              src={props.imagen}
              className={classes.large}
            >
              {props.nombre[0]}
            </Avatar>
          </Grid>
          <Grid
            item
            xs={10}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          >
            <Typography variant="h4">{props.nombre}</Typography>
            <Typography variant="h6">{props.titulo}</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CabeceraPerfil;

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
  },
  customContainer: {
    padding: theme.spacing(5),
    backgroundColor: "#ffffff",
  },
}));

const Cabecera = () => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xl" className={classes.customContainer}>
        <Grid container>
          <Grid item xs={2} container justify="center" alignItems="center">
            <Avatar
              alt="Imagen"
              src="https://pps.whatsapp.net/v/t61.24694-24/97969579_3102912936463371_7208379054937379558_n.jpg?oe=5EC495F5&oh=68e4ca58a0f65f680df95105f6ba41ae"
              className={classes.large}
            />
          </Grid>
          <Grid
            item
            xs={10}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          >
            <Typography variant="h4">HERRERA GUTIERREZ, Carolina</Typography>
            <Typography variant="h6">Administrador</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cabecera;

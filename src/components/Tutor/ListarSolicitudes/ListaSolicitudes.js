import React from "react";
import { Paper, makeStyles, Grid, Typography } from "@material-ui/core";
import Solicitud from "./Solicitud";

const useStyles = makeStyles((theme) => ({
  caja: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(5),
    width: theme.spacing(200),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(42),
    },
  },
}));

const ListaSolicitudes = (props) => {
  const classes = useStyles();
  const { solicitudes } = props;

  console.log(solicitudes);

  return (
    <>
      <Paper className={classes.caja}>
        <Grid container spacing={2} direction="column">
          {solicitudes.map((sol) => (
            <Grid item key={sol.ID_ASIGNACION}>
              <Solicitud solicitud={sol} />
            </Grid>
          ))}
          {/* {!solicitudes.length && (
            <Typography variant="h5" align="center">
              Por favor seleccione un programa
            </Typography>
          )} */}
        </Grid>
      </Paper>
    </>
  );
};

export default ListaSolicitudes;

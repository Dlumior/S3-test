import React from "react";
import { Paper, makeStyles, Grid, Typography } from "@material-ui/core";
import ItemAlumno from "./ItemAlumno";

const useStyles = makeStyles((theme) => ({
  caja: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    width: theme.spacing(160),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
  },
}));

const Alumnos = [
  { id: 1, fullname: "Jose Perez", faculty: "EEGGCC", image: "" },
  { id: 2, fullname: "Adrian Perez", faculty: "FACI", image: "" },
  { id: 3, fullname: "Gerardo Perez", faculty: "EEGGLL", image: "" },
];

const ListaAlumnos = (props) => {
  const classes = useStyles();
  const { alumnos, history, procesoTutoria } = props;
  let alumnosAux = [];
  // //console.log(alumnos);
  // alumnos.map((item) => {
  //   //console.log(item.ID_ALUMNO);
  //   //console.log(item.ALUMNO.USUARIO.NOMBRE + " "+item.ALUMNO.USUARIO.APELLIDOS);
  //   //console.log(item.ALUMNO.USUARIO.PROGRAMAs[0].NOMBRE);
  // });

  if (alumnos !== null || alumnos !== undefined) {
    console.log("DESDE LISTA alumnos", alumnos);
    if (
      alumnos.length > 1 &&
      alumnos[0].ASIGNACION_TUTORIA_X_ALUMNOs !== undefined
    ) {
      alumnosAux = alumnos.map((item) => item.ASIGNACION_TUTORIA_X_ALUMNOs[0]);
      console.log("================================");
      console.log("Lista alumnos parseado: ", alumnosAux);
    } else {
      alumnosAux = alumnos;
    }
  }

  return (
    <Paper className={classes.caja}>
      <Grid container spacing={5}>
        {procesoTutoria === "" && (
          <Typography variant="subtitle1" align="center">
            Seleccione una facultad y un proceso de tutoría
          </Typography>
        )}
        {alumnosAux.length === 0 && procesoTutoria !== "" && (
          <Typography variant="subtitle1" align="center">
            No tiene alumnos asignados
          </Typography>
        )}
        {alumnosAux.map((item) => (
          <ItemAlumno
            key={item.ID_ALUMNO}
            idAlumno={item.ID_ALUMNO}
            history={props.history}
            fullname={
              item.ALUMNO.USUARIO.NOMBRE + " " + item.ALUMNO.USUARIO.APELLIDOS
            }
            faculty={item.ALUMNO.USUARIO.PROGRAMAs.map(
              (programa) => programa.NOMBRE + "/"
            )}
            image={item.ALUMNO.USUARIO.IMAGEN}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default ListaAlumnos;

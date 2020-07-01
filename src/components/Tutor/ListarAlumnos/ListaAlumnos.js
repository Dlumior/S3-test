import React from "react";
import { Paper, makeStyles, Grid } from "@material-ui/core";
import ItemAlumno from "./ItemAlumno";

const useStyles = makeStyles((theme) => ({
  caja: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    width: theme.spacing(160),
  },
}));

const Alumnos = [
  { id: 1, fullname: "Jose Perez", faculty: "EEGGCC", image: "" },
  { id: 2, fullname: "Adrian Perez", faculty: "FACI", image: "" },
  { id: 3, fullname: "Gerardo Perez", faculty: "EEGGLL", image: "" },
];

const ListaAlumnos = (props) => {
  const classes = useStyles();
  const { alumnos } = props;
  // console.log(alumnos);
  // alumnos.map((item) => {
  //   console.log(item.ID_ALUMNO);
  //   console.log(item.ALUMNO.USUARIO.NOMBRE + " "+item.ALUMNO.USUARIO.APELLIDOS);
  //   console.log(item.ALUMNO.USUARIO.PROGRAMAs[0].NOMBRE);
  // });

  return (
    <Paper className={classes.caja}>
      <Grid container spacing={5}>
        {alumnos.map((item) => (
          <ItemAlumno
            key={item.ASIGNACION_TUTORIA_X_ALUMNOs[0].ID_ALUMNO}
            idAlumno={item.ASIGNACION_TUTORIA_X_ALUMNOs[0].ID_ALUMNO}
            history={props.history}
            fullname={
              item.ASIGNACION_TUTORIA_X_ALUMNOs[0].ALUMNO.USUARIO.NOMBRE + " " + item.ASIGNACION_TUTORIA_X_ALUMNOs[0].ALUMNO.USUARIO.APELLIDOS
            }
            faculty={item.ASIGNACION_TUTORIA_X_ALUMNOs[0].ALUMNO.USUARIO.PROGRAMAs.map(
              (programa) => programa.NOMBRE + "/"
            )}
            image={item.ASIGNACION_TUTORIA_X_ALUMNOs[0].ALUMNO.USUARIO.IMAGEN}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default ListaAlumnos;

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

const ListaAlumnos = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.caja}>
      <Grid container spacing={5}>
        {Alumnos.map((item) => (
          <ItemAlumno
            key={item.id}
            fullname={item.fullname}
            faculty={item.faculty}
            image={item.image}
          />
        ))}
      </Grid>
    </Paper>
  );
};

export default ListaAlumnos;

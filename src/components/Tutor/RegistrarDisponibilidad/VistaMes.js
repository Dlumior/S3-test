import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CuadroDia from "./CuadroDia";

const diaArray = [
  { dia: "Lunes" },
  { dia: "Martes" },
  { dia: "Miercoles" },
  { dia: "Jueves" },
  { dia: "Viernes" },
  { dia: "Sábado" },
];

const VistaMes = () => {
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      {diaArray.map((item) => (
        <Grid item md={2} key={item.dia}>
          <Typography variant="subtitle1" align="center">
            {item.dia}
          </Typography>
        </Grid>
      ))}
      <Grid item md={12}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
          <Grid item md={2}>
            <CuadroDia />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VistaMes;

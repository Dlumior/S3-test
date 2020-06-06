import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import CuadroDia from "./CuadroDia";
import EventsCalendar from "./EventsCalendar";

const diaArray = [
  { dia: "Lunes" },
  { dia: "Martes" },
  { dia: "Miercoles" },
  { dia: "Jueves" },
  { dia: "Viernes" },
  { dia: "Sábado" },
];

const VistaMes = () => {
  const [datosForm, setDatosForm] = useState({
    OPEN: false
  });
  return (
    <EventsCalendar />
    //<iframe src={"https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%233aafa9&amp;ctz=America%2FLima&amp;showTitle=1&amp;title=Nombre"} borderWidth={0} width={800} height={600} frameborder={0}scrolling={"no"}> </iframe>
    /*<Grid container spacing={2} justify="center" alignItems="center">
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
          
             <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid>
          <Grid item md={2}>
            <CuadroDia datos={datosForm} setDatos={setDatosForm}/>
          </Grid> 
        </Grid>
      </Grid
    </Grid>>*/
  );
};

export default VistaMes;

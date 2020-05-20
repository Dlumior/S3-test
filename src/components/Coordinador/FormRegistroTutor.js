import React from "react";
import { Paper, Grid, TextField, Button, makeStyles } from "@material-ui/core";

import * as Controller from "./../../Conexion/Controller";

const useStyles = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(5),
    width: theme.spacing(150),
    height: theme.spacing(50),
  },
}));

const handleName = (e, datos, setDatos) => {
  setDatos({
    ...datos,
    name: e.target.value,
  });
};

const handleLastName = (e, datos, setDatos) => {
  setDatos({
    ...datos,
    lastnames: e.target.value,
  });
};

const handleEmail = (e, datos, setDatos) => {
  setDatos({
    ...datos,
    email: e.target.value,
  });
};

const handlePhoneNumber = (e, datos, setDatos) => {
  setDatos({
    ...datos,
    phoneNumber: e.target.value,
  });
};

const handleAddress = (e, datos, setDatos) => {
  setDatos({
    ...datos,
    address: e.target.value,
    username: e.target.value,
  });
};

const handleCode = (e, datos, setDatos) => {
  setDatos({
    ...datos,
    code: e.target.value,
  });
};

const FormRegistroTutor = (props) => {
  const classes = useStyles();
  const { datos, setDatos } = props;
  // const [age, setAge] = React.useState("");

  const handleClick = async (e, datos, setDatos) => {
    setDatos({
      ...datos,
      password: datos.name + datos.lastnames,
    });

    const props = { servicio: "/api/tutor", request: { tutor: datos } };
    console.log("saving new tutor in DB:", datos);
    let nuevoTutor = await Controller.POST(props);
    console.log("got updated alumno from back:", nuevoTutor);
  };

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <Paper className={classes.caja}>
      <Grid
        container
        xs={12}
        direction="column"
        spacing={4}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              id="nombres"
              label="Nombres"
              type="text"
              fullWidth
              onChange={(e) => handleName(e, datos, setDatos)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="apellidos"
              label="Apellidos"
              type="text"
              fullWidth
              onChange={(e) => handleLastName(e, datos, setDatos)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="email"
              label="Correo"
              type="email"
              fullWidth
              onChange={(e) => handleEmail(e, datos, setDatos)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="telefono"
              label="Teléfono"
              type="text"
              fullWidth
              onChange={(e) => handlePhoneNumber(e, datos, setDatos)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="direccion"
              label="Dirección"
              type="text"
              fullWidth
              onChange={(e) => handleAddress(e, datos, setDatos)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="codigo"
              label="Código"
              type="text"
              fullWidth
              onChange={(e) => handleCode(e, datos, setDatos)}
            />
          </Grid>
        </Grid>
        {/* <Grid item xs={12} container spacing={10}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="programa">Programa</InputLabel>
              <Select
                labelId="programa"
                id="programa"
                value={age}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}
        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="center"
          spacing={10}
        >
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => handleClick(e, datos, setDatos)}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormRegistroTutor;

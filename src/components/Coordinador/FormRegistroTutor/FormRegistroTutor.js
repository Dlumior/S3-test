import React, { useState } from "react";
import { Paper, Grid, TextField, Button, makeStyles } from "@material-ui/core";

import * as Controller from "./../../../Conexion/Controller.js";
import errorObj from "./errorObj.js";
import validateName from "./validateName.js";
import validateLastNames from "./validateLastNames.js";
import validatePhoneNumber from "./validatePhoneNumber.js";
import validateAddress from "./validateAddress.js";
import validateCode from "./validateCode.js";
import validateEmail from "./validateEmail.js";

const useStyles = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(5),
    width: theme.spacing(150),
    height: theme.spacing(55),
  },
}));

const handleName = (e, datos, setDatos, errors, setErrors) => {
  const auxName = e.target.value;

  setDatos({
    ...datos,
    NOMBRE: auxName,
  });

  const res = validateName(auxName);
  setErrors({ ...errors, name: res });
};

const handleLastName = (e, datos, setDatos, errors, setErrors) => {
  const auxLastNames = e.target.value;

  setDatos({
    ...datos,
    APELLIDOS: auxLastNames,
  });

  const res = validateLastNames(auxLastNames);
  setErrors({ ...errors, lastnames: res });
};

const handleEmail = (e, datos, setDatos, errors, setErrors) => {
  const auxEmail = e.target.value;

  setDatos({
    ...datos,
    CORREO: auxEmail,
    USUARIO: auxEmail,
  });

  const res = validateEmail(auxEmail);
  setErrors({ ...errors, email: res });
};

const handlePhoneNumber = (e, datos, setDatos, errors, setErrors) => {
  const auxPhone = e.target.value;

  setDatos({
    ...datos,
    TELEFONO: auxPhone,
  });

  const res = validatePhoneNumber(auxPhone);
  setErrors({ ...errors, phoneNumber: res });
};

const handleAddress = (e, datos, setDatos, errors, setErrors) => {
  const auxAddress = e.target.value;

  setDatos({
    ...datos,
    DIRECCION: auxAddress,
  });

  const res = validateAddress(auxAddress);
  setErrors({ ...errors, address: res });
};

const handleCode = (e, datos, setDatos, errors, setErrors) => {
  const auxCode = e.target.value;

  setDatos({
    ...datos,
    CODIGO: auxCode,
  });

  const res = validateCode(auxCode);
  setErrors({ ...errors, code: res });
};

const FormRegistroTutor = (props) => {
  const classes = useStyles();
  const { datos, setDatos } = props;
  const [errors, setErrors] = useState(errorObj);

  const handleClick = async (e, datos, setDatos) => {
    if (
      errors.name.error ||
      errors.lastnames.error ||
      errors.email.error ||
      errors.phoneNumber.error ||
      errors.address.error ||
      errors.code.error
    ) {
      alert("Hay errores en los campos");
      return;
    } else {
      setDatos({
        ...datos,
        CONTRASENHA: datos.name + datos.lastnames,
      });
      console.log(datos);

      const sendData = { servicio: "/api/tutor", request: { tutor: datos } };
      console.log("Saving new tutor in DB:", datos);
      let nuevoTutor = await Controller.POST(sendData);
      console.log("Got updated alumno from back:", nuevoTutor);
      alert("Se creó correctamente el tutor");
    }
  };

  return (
    <Paper className={classes.caja}>
      <Grid
        container
        direction="column"
        spacing={4}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              required
              error={errors.name.error}
              margin="dense"
              id="nombres"
              label="Nombres"
              type="text"
              fullWidth
              onChange={(e) =>
                handleName(e, datos, setDatos, errors, setErrors)
              }
              helperText={errors.name.mesage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              error={errors.lastnames.error}
              margin="dense"
              id="apellidos"
              label="Apellidos"
              type="text"
              fullWidth
              onChange={(e) =>
                handleLastName(e, datos, setDatos, errors, setErrors)
              }
              helperText={errors.lastnames.mesage}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              required
              error={errors.email.error}
              margin="dense"
              id="email"
              label="Correo"
              type="email"
              fullWidth
              onChange={(e) =>
                handleEmail(e, datos, setDatos, errors, setErrors)
              }
              helperText={errors.email.mesage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={errors.phoneNumber.error}
              margin="dense"
              id="telefono"
              label="Teléfono"
              type="text"
              fullWidth
              onChange={(e) =>
                handlePhoneNumber(e, datos, setDatos, errors, setErrors)
              }
              helperText={errors.phoneNumber.mesage}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              error={errors.address.error}
              margin="dense"
              id="direccion"
              label="Dirección"
              type="text"
              fullWidth
              onChange={(e) =>
                handleAddress(e, datos, setDatos, errors, setErrors)
              }
              helperText={errors.address.mesage}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              error={errors.code.error}
              margin="dense"
              id="codigo"
              label="Código"
              type="text"
              fullWidth
              onChange={(e) =>
                handleCode(e, datos, setDatos, errors, setErrors)
              }
              helperText={errors.code.mesage}
            />
          </Grid>
        </Grid>
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

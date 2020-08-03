import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, Button, makeStyles } from "@material-ui/core";

import * as Controller from "./../../../../Conexion/Controller.js";
import errorObj from "./../errorObj.js";
import validateName from "./../validateName.js";
import validateLastNames from "./../validateLastNames.js";
import validatePhoneNumber from "./../validatePhoneNumber.js";
import validateAddress from "./../validateAddress.js";
import validateCode from "./../validateCode.js";
import validateEmail from "./../validateEmail.js";
import ComboBoxPrograma from "./../comboBoxProgramas.js";
import { getUser } from "../../../../Sesion/Sesion.js";
import ComboBoxFacultades from "./../ComboBoxFacultades.js";
import Alertas from "../../Alertas.jsx";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  caja: {
    // marginTop: theme.spacing(3),
    padding: theme.spacing(5),
    width: theme.spacing(150),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
    // height: theme.spacing(55),
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

const handleEmail = (
  e,
  datos,
  setDatos,
  errors,
  setErrors,
  dominio1,
  dominio2
) => {
  const auxEmail = e.target.value;

  setDatos({
    ...datos,
    CORREO: auxEmail,
    USUARIO: auxEmail,
  });

  const res = validateEmail(auxEmail, dominio1, dominio2);
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

const FormModificar = (props) => {
  const classes = useStyles();
  const idCoordinador = getUser().usuario.ID_USUARIO;
  const rolCoordinador = getUser().idRol;

  const [disabled, setDisabled] = useState(false);

  const [datos, setDatos] = React.useState({
    ID_TUTOR: props.datos.ID_USUARIO,
    NOMBRE: props.datos.NOMBRE,
    APELLIDOS: props.datos.APELLIDOS,
    CODIGO: props.datos.CODIGO,
    CORREO: props.datos.CORREO,
    TELEFONO: props.datos.TELEFONO,
    DIRECCION: props.datos.DIRECCION,
    USUARIO: props.datos.USUARIO,
    IMAGEN: "",
    PROGRAMA: props.datos.ROL_X_USUARIO_X_PROGRAMAs.map(
      (item) => item.ID_PROGRAMA
    ),
  });
  //console.log(props.datos);
  const [errors, setErrors] = useState(errorObj);

  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState(props.facultad);

  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState(props.programa);

  const [dominio1, setDominio1] = useState("");
  const [dominio2, setDominio2] = useState("");

  const [severidad, setSeveridad] = useState("");
  const [alerta, setAlerta] = useState({ mensaje: "" });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchTutores() {
      let institucion = await Controller.GET({ servicio: "/api/institucion" });
      //console.log("RegistrarTutor institucion: ", institucion);
      setDominio1(institucion.institucion.DOMINIO);
      setDominio2(institucion.institucion.DOMINIO2);
      //console.log("RegistrarTutor dominio1: ", dominio1);
      //console.log("RegistrarTutor dominio2: ", dominio2);
    }

    fetchTutores();
  }, [dominio1, dominio2]);

  //Funcion auxiliar para obtener las facultades del coordinador
  useEffect(() => {
    async function fetchFacultades() {
      let endpoint;
      if (rolCoordinador === 6) {
        endpoint = "/api/facultad/coordinador/" + idCoordinador;
      } else if (rolCoordinador === 2) {
        endpoint = "/api/facultad/lista/" + idCoordinador;
      }
      //console.log("endpoint: " + endpoint);

      const params = { servicio: endpoint };
      const res = await Controller.GET(params);
      //console.log(res);
      if (res) {
        setFacultades(res.facultades);
      }
    }
    fetchFacultades();
  }, [rolCoordinador, idCoordinador]);

  //Funcion para obtener los programas de una facultad
  useEffect(() => {
    async function fetchProgramas() {
      let endpoint;
      if (rolCoordinador === 6) {
        endpoint = "/api/programa/lista/" + facultad;
      } else if (rolCoordinador === 2) {
        endpoint = "/api/programa/lista/" + idCoordinador + "/" + facultad;
      }
      const params = { servicio: endpoint };
      const res = await Controller.GET(params);

      //console.log("enpoint programa: " + endpoint);
      //console.log("res de programas: ");
      //console.log("=========");
      //console.log(res);
      //console.log("=========");

      if (res !== null) {
        if (rolCoordinador === 6) {
          //console.log("asignando programa");
          //console.log(res);
          if (res) {
            setProgramas(res.programa);
          }
        } else if (rolCoordinador === 2) {
          //console.log("asignando programas");
          //console.log(res);
          if (res) {
            setProgramas(res.programas);
          }
        }
      }
    }
    if (facultad !== "") {
      fetchProgramas();
    }
  }, [facultad]);

  const handleClick = async (e, datos, setDatos) => {
    if (
      errors.name.error ||
      errors.lastnames.error ||
      errors.email.error ||
      errors.phoneNumber.error ||
      errors.address.error ||
      errors.code.error
    ) {
      // alert("Hay errores en los campos");
      setSeveridad("error");
      setAlerta({
        mensaje: "Existen errores en el formulario",
      });
      return;
    } else {
      //   setDatos({
      //     ...datos,
      //     // CONTRASENHA: "contra",
      //     PROGRAMA: datos.PROGRAMA.push(programa),
      //   });
      //   //console.log(datos);

      const sendData = {
        servicio: "/api/tutor/modificar",
        request: { tutor: { ...datos, PROGRAMA: [programa] } },
      };
      //console.log("Saving new tutor in DB:", sendData);
      let nuevoTutor = await Controller.POST(sendData);
      if (nuevoTutor !== null || nuevoTutor.error === "") {
        //console.log("Got updated tutor from back:", nuevoTutor);
        // alert("Se creó correctamente el tutor");
        setSeveridad("success");
        setAlerta({
          mensaje: "Se modificó correctamente el tutor",
        });
      } else {
        //console.log("Got updated tutor from back:", nuevoTutor);
        // alert("Se creó correctamente el tutor");
        setSeveridad("warning");
        setAlerta({
          mensaje: "Algo salió mal :(",
        });
      }
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Modificar tutor</DialogTitle>
        <DialogContent>
          <Paper className={classes.caja} variant="outlined">
            <Alertas
              severity={severidad}
              titulo={"Observacion:"}
              alerta={alerta}
            />
            <Grid
              container
              direction="column"
              spacing={4}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} container spacing={10}>
                <Grid item xs={12} md={6}>
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
                    defaultValue={datos.NOMBRE}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                    defaultValue={datos.APELLIDOS}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={10}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    error={errors.email.error}
                    margin="dense"
                    id="email"
                    label="Correo"
                    type="email"
                    fullWidth
                    onChange={(e) =>
                      handleEmail(
                        e,
                        datos,
                        setDatos,
                        errors,
                        setErrors,
                        dominio1,
                        dominio2
                      )
                    }
                    helperText={errors.email.mesage}
                    defaultValue={datos.CORREO}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                    defaultValue={datos.TELEFONO}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={10}>
                <Grid item xs={12} md={6}>
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
                    defaultValue={datos.DIRECCION}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                    defaultValue={datos.CODIGO}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={10}>
                <Grid item xs={12} md={6}>
                  <ComboBoxFacultades
                    programas={facultades}
                    programa={facultad}
                    setPrograma={setFacultad}
                    setDisabled={setDisabled}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ComboBoxPrograma
                    disabled={disabled}
                    programas={programas}
                    programa={programa}
                    setPrograma={setPrograma}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                justify="flex-end"
                alignItems="center"
                // spacing={10}
              >
                <Grid item xs={2}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(e) => handleClick(e, datos, setDatos)}
                  >
                    Modificar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormModificar;

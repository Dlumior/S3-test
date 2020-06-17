import React, { useState, useRef } from "react";
import { getUser } from "../../Sesion/Sesion";
import Datos from "../../components/Coordinador/Datos";
//import Cabecera from "../../components/Coordinador/Cabecera.js";
import { Grid, makeStyles } from "@material-ui/core";

import LuisR from "../../components/Coordinador/luisRios.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil.js";
import { POST } from "../../Conexion/Controller";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = (props) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const dir = useRef(null);
  const tel = useRef(null);

  const handleEdit = async (e) => {
    setIsEdit(true);
    console.log(dir.current.value);
    console.log(tel.current.value);
    const datos = {};
    if (getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs[0].ROL.ID_ROL === 2) {
      datos = {
        ID: getUser().usuario.ID_USUARIO,
        NOMBRE: getUser().usuario.NOMBRE,
        APELLIDOS: getUser().usuario.APELLIDOS,
        CODIGO: getUser().usuario.CODIGO,
        CORREO: getUser().usuario.CORREO,
        TELEFONO: tel.current.value,
        DIRECCION: dir.current.value,
        USUARIO: getUser().usuario.USUARIO,
        IMAGEN: getUser().usuario.IMAGEN,
        FACULTAD: getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs.filter(
          (item) => item.ROL.ID_ROL === 2
        ),
      };
    }
    const sendData = {
      servicio: "/api/coordinadorfacultad/modificar",
      request: { coordinador: datos },
    };
    console.log("Saving new tutor in DB:", datos);
    let nuevoTutor = await POST(sendData);
    console.log("Got updated alumno from back:", nuevoTutor);
    alert("Se creó correctamente el tutor");
  };

  const handleGuardar = () => {
    setIsEdit(false);
  };

  console.log("user", getUser());
  return (
    <div>
      {/*<Cabecera titulo="Coordinador" nombre="RIOS ALEJOS, Luis Esteban"/> */}
      <CabeceraPerfil
        titulo="Coordinador"
        nombre={getUser().usuario.APELLIDOS + ", " + getUser().usuario.NOMBRE}
        imagen={LuisR}
      />
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.customContainer}
      >
        <Grid item>
          <Datos
            isEdit={isEdit}
            codigo={getUser().usuario.CODIGO}
            correo={getUser().usuario.CORREO}
            direccion={getUser().usuario.DIRECCION}
            telefono={getUser().usuario.TELEFONO}
            refs={{ dir: dir, tel: tel }}
            handleEdit={handleEdit}
            handleGuardar={handleGuardar}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Perfil;

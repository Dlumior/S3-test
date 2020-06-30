import React, { useState, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import { POST } from "../../../Conexion/Controller";
import Datos from "../../Coordinador/Datos";
import HistoricoResultados from "./HistoricoResultados";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    marginTop: theme.spacing(5),
  },
}));

const handleClick = () => {
  let usuario = { ...JSON.parse(sessionStorage.Sesion) };
  usuario.rol = "Alumno";
  sessionStorage.Sesion = JSON.stringify(usuario);
  console.log("Nuevo rol: ", JSON.parse(sessionStorage.Sesion).rol);
};

const DatosGenerales = () => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  const dir = useRef(null);
  const tel = useRef(null);

  const handleEdit = (e) => {
    setIsEdit(true);
  };

  const handleGuardar = async () => {
    setIsEdit(false);

    const datos = {
      ID_USUARIO: getUser().usuario.ID_USUARIO,
      TELEFONO: tel.current.value,
      DIRECCION: dir.current.value,
    };
    const sendData = {
      servicio: "/api/usuario/actualizarperfil",
      request: { usuario: datos },
    };

    console.log("Saving new info in DB:", datos);
    let edited = await POST(sendData);
    if (edited !== null) {
      console.log("Got updated user from back:", edited);
      alert("Se guardaron los cambios correctamente");
    } else {
      console.log("Hubo un error");
    }
  };

  return (
    <div>
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

export default DatosGenerales;

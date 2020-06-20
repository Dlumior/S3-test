import React, { useState, useRef } from "react";
import { getUser } from "../../Sesion/Sesion";
import Datos from "../../components/Coordinador/Datos";
import { Grid, makeStyles } from "@material-ui/core";
import LuisR from "../../components/Coordinador/luisRios.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil.js";
import { POST } from "../../Conexion/Controller";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    marginTop: theme.spacing(5),
  },
}));

const Perfil = (props) => {
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
      servicio: "api/usuario/actualizarperfil",
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
      <CabeceraPerfil
        titulo="Coordinador"
        nombre={getUser().usuario.APELLIDOS + ", " + getUser().usuario.NOMBRE}
      />
      <Grid
        container
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

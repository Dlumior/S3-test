import React, { useState, useRef } from "react";
// import Datos from "../../components/Tutor/Datos";
import { Grid, makeStyles } from "@material-ui/core";
import ImgTutor from "../../components/Tutor/tutor.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil";
import { getUser } from "../../Sesion/Sesion";
import { POST } from "../../Conexion/Controller";
import Datos from "../../components/Coordinador/Datos";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    marginTop: theme.spacing(5),
  },
}));

const Perfil = () => {
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
      <CabeceraPerfil
        titulo="Tutor"
        nombre={getUser().usuario.APELLIDOS + ", " + getUser().usuario.NOMBRE}
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

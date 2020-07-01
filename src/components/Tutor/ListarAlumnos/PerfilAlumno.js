import React, { useState, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import CabeceraPerfil from "../../../components/Shared/CabeceraPerfil";
import { POST } from "../../../Conexion/Controller";
import Datos from "../../../components/Coordinador/Datos";
import FrmPlanAccion from "../../../components/Alumno/Perfil/FrmPlanAccion";
import TabProceso from "../../../components/Coordinador/Tutorias/TabProceso";
import DatosGenerales from "../../../components/Alumno/Perfil/DatosGenerales";
import FrmResultados from "../../../components/Alumno/Perfil/FrmResultados";

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

const Perfil = (props) => {
  const {idAlumno,fullname}=props;
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const procesos= [{ index:0,titulo: "Datos Generales",proceso:DatosGenerales },
                   { index:1,titulo: "Plan de Accion", proceso:FrmPlanAccion },
                   { index:2,titulo: "Resultados", proceso:FrmResultados}
      ];

  const dir = useRef(null);
  const tel = useRef(null);

  const handleEdit = (e) => {
    setIsEdit(true);
  };

  const handleGuardar = async () => {
    setIsEdit(false);

    const datos = {
      ID_USUARIO: props.idAlumno,
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
        titulo="Alumno"
        nombre={props.fullname}
      />
      <TabProceso  procesos={procesos} />
    </div>
  );
};

export default Perfil;

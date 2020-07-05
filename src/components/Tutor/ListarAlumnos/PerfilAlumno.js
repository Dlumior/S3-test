import React, { useState, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import CabeceraPerfil from "../../../components/Shared/CabeceraPerfil";
import { POST } from "../../../Conexion/Controller";
import Datos from "../../../components/Coordinador/Datos";
import FrmPlanAccion from "../../../components/Alumno/Perfil/FrmPlanAccion";
import TabProceso from "../../../components/Coordinador/Tutorias/TabProceso";
import DatosGenerales from "./DatosGenerales";
import FrmResultados from "../../../components/Alumno/Perfil/FrmResultados";
import Asistencias from "../../../components/Alumno/Perfil/Asistencias";

import HistoricoResultados from "../../Alumno/Perfil/HistoricoResultados";

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
  const { idAlumno, fullname } = props.match.params;
  console.log("veamos", idAlumno, fullname);
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const procesos = [
    {
      index: 0,
      titulo: "Datos Generales",
      proceso: () => <DatosGenerales idAlumno={idAlumno}/>, paper:false
    },
    {
      index: 1,
      titulo: "Plan de Accion",
      proceso: () => <FrmPlanAccion idAlumno={idAlumno} />,
    },
    {
      index: 2,
      titulo: "Resultados",
      proceso: () => <HistoricoResultados datosAlumno={props.match.params} />,
    },
    {
      index: 3,
      titulo: "Asistencias",
      proceso: () => <Asistencias datosAlumno={props.match.params} />,
    },
  ];
  const procesosCoordinador = [
    {
      index: 0,
      titulo: "Asistencias",
      proceso: () => <Asistencias datosAlumno={props.match.params} />,
    },
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
        nombre={fullname}
        alumnodesdetutor={true}
      />
      <TabProceso procesos={getUser().rol==="Tutor" || getUser().rol==="Alumno"? 
                  procesos:procesosCoordinador} paper={true}/>
    </div>
  );
};

export default Perfil;

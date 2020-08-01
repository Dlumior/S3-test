import React, { useState, useRef, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import { POST, GET } from "../../../Conexion/Controller";
import Datos from "../../Coordinador/Datos";
import Alertas from "../../Coordinador/Alertas";
//import HistoricoResultados from "./HistoricoResultados";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    marginTop: theme.spacing(5),
  },
}));
/*
const handleClick = () => {
  let usuario = { ...JSON.parse(sessionStorage.Sesion) };
  usuario.rol = "Alumno";
  sessionStorage.Sesion = JSON.stringify(usuario);
  //console.log("Nuevo rol: ", JSON.parse(sessionStorage.Sesion).rol);
};
*/
const DatosGenerales = (props) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [usr, setUsr] = useState({
    CODIGO: getUser().usuario.CODIGO,
    CORREO: getUser().usuario.CORREO,
    DIRECCION: getUser().usuario.DIRECCION,
    TELEFONO: getUser().usuario.TELEFONO,
  });
  const dir = useRef(null);
  const tel = useRef(null);

  const [severidad, setSeveridad] = useState("");
  const [alerta, setAlerta] = useState({ mensaje: "" });

  useEffect(() => {
    async function fetchData() {
      //console.log("roll",getUser().rol);

      const endpoint = "/api/alumno/" + getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log("alumno:", res);
      if (res !== null && res.alumno !== undefined && res.alumno !== null) {
        setUsr({
          ...usr,
          DIRECCION: res.alumno.USUARIO.DIRECCION,
          TELEFONO: res.alumno.USUARIO.TELEFONO,
        });
        if (
          tel !== null &&
          dir !== null &&
          tel.current !== null &&
          dir.current !== null
        ) {
          tel.current.value = res.alumno.USUARIO.TELEFONO;
          dir.current.value = res.alumno.USUARIO.DIRECCION;
        }
        // setUsr(res.data);
      }
      //console.log("alumno:", alumno);
    }
    fetchData();
  }, []);

  const handleEdit = (e) => {
    setIsEdit(true);
  };

  const handleGuardar = async () => {
    setIsEdit(false);

    const datos = {
      ID_USUARIO: props.idAlumno
        ? props.idAlumno
        : getUser().usuario.ID_USUARIO,
      TELEFONO: tel.current.value,
      DIRECCION: dir.current.value,
    };
    const sendData = {
      servicio: "/api/usuario/actualizarperfil",
      request: { usuario: datos },
    };

    //console.log("Saving new info in DB:", datos);
    let edited = await POST(sendData);
    if (edited !== null) {
      //console.log("Got updated user from back:", edited);
      setSeveridad("success");
      setAlerta({
        mensaje: "Se guardaron los cambios correctamente",
      });
    } else {
      setSeveridad("error");
      setAlerta({
        mensaje: "Algo salió mal, inténtalo nuevamente en unos minutos",
      });
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
          <Alertas
            severity={severidad}
            titulo={"Observacion:"}
            alerta={alerta}
          />
          <Datos
            isEdit={isEdit}
            codigo={usr.CODIGO}
            correo={usr.CORREO}
            direccion={usr.DIRECCION}
            telefono={usr.TELEFONO}
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

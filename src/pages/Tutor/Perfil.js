import React, { useState, useRef, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil";
import { getUser } from "../../Sesion/Sesion";
import { POST, GET } from "../../Conexion/Controller";
import Datos from "../../components/Coordinador/Datos";
import Alertas from "../../components/Coordinador/Alertas";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    marginTop: theme.spacing(5),
  },
}));

const Perfil = () => {
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

    //console.log("Saving new info in DB:", datos);
    let edited = await POST(sendData);
    if (edited !== null) {
      //console.log("Got updated user from back:", edited);
      //alert("Se guardaron los cambios correctamente");
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

  useEffect(() => {
    async function fetchTutor() {
      const endpoint = "/api/tutor/" + getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log("=================");
      console.log("Perifl", res.data);
      console.log(getUser());
      if (res !== null && res.data !== undefined && res.data !== null) {
        setUsr({
          ...usr,
          DIRECCION: res.data.DIRECCION,
          TELEFONO: res.data.TELEFONO,
        });
        if (
          tel !== null &&
          dir !== null &&
          tel.current !== null &&
          dir.current !== null
        ) {
          tel.current.value = res.data.TELEFONO;
          dir.current.value = res.data.DIRECCION;
        }
        // setUsr(res.data);
      }
    }

    fetchTutor();
  }, []);

  return (
    <div>
      <CabeceraPerfil
        titulo="Tutor"
        nombre={getUser().usuario.APELLIDOS + ", " + getUser().usuario.NOMBRE}
      />
      <Grid
        container
        //spacing={5}
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
            // codigo={getUser().usuario.CODIGO}
            // correo={getUser().usuario.CORREO}
            // direccion={getUser().usuario.DIRECCION}
            // telefono={getUser().usuario.TELEFONO}
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

export default Perfil;

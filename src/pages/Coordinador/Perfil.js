import React, { useState, useRef, useEffect } from "react";
import { getUser } from "../../Sesion/Sesion";
import Datos from "../../components/Coordinador/Datos";
import { Grid, makeStyles } from "@material-ui/core";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil.js";
import { POST, GET } from "../../Conexion/Controller";
import Alertas from "../../components/Coordinador/Alertas";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    marginTop: theme.spacing(5),
  },
}));

const Perfil = (props) => {
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
      const endpoint = "/api/coordinador/" + getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log("=================");
      //console.log("Perifl", res.data);
      //console.log(getUser());
      if (
        res !== null &&
        res.coordinador !== undefined &&
        res.coordinador !== null
      ) {
        setUsr({
          ...usr,
          DIRECCION: res.coordinador.DIRECCION,
          TELEFONO: res.coordinador.TELEFONO,
        });
        if (
          tel !== null &&
          dir !== null &&
          tel.current !== null &&
          dir.current !== null
        ) {
          tel.current.value = res.coordinador.TELEFONO;
          dir.current.value = res.coordinador.DIRECCION;
        }
        // setUsr(res.data);
      }
    }

    fetchTutor();
  }, []);

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

export default Perfil;

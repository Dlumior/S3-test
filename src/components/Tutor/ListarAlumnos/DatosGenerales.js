import React, { useState, useRef, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import { POST, GET } from "../../../Conexion/Controller";
import Datos from "./Datos";

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

const DatosGenerales = (props) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [alumno,setAlumno]=useState({
    codigo:'',
    correo:'',
    direccion:'',
    telefono:'',
  });

  useEffect(() => {
    async function fetchData() {
      console.log("roll",getUser().rol);
        if (getUser().rol ==="Tutor"){
            const endpoint = "/api/alumno/"+props.idAlumno;
            const params = { servicio: endpoint };
            const res = await GET(params);    
            console.log("res:", res);
            if (res){
              alumno.codigo=res.alumno.USUARIO.CODIGO;
              alumno.correo=res.alumno.USUARIO.CORREO;
              alumno.direccion=res.alumno.USUARIO.DIRECCION;
              alumno.telefono=res.alumno.USUARIO.TELEFONO;
              console.log("alumno:", alumno);
              setAlumno({
                ...
                alumno
              });
            }
        }
    }     
    fetchData();
},{});

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
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.customContainer}
      >
        <Grid item>
          {console.log("direcc:",alumno.direccion)}
          <Datos
            isEdit={isEdit}
            codigo={alumno.codigo}
            correo={alumno.correo}
            direccion={alumno.direccion}
            telefono={alumno.telefono}
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

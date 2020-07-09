import React,{ Component, useEffect,useState } from "react";
import RegistrarFacultad from "../../components/Administrador/Facultades/RegistrarFacultad";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaFacultades from "../../components/Administrador/Facultades/ListaFacultades";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles, IconButton } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import { getUser } from "../../Sesion/Sesion";

const Facultades = () => {
  const [facultades, setFacultades] = useState([]);
  const [flag1,setFlag1]=useState(0);//actualizacion entre hermanos
  const [flag2,setFlag2]=useState(0);
  //const [update,setUpdate]=useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log("getuser",getUser().rol);
      if (getUser().rol==="Administrador"){
        const endpoint = "/api/facultad";
        const params = { servicio: endpoint };
        const res = await GET(params);
        setFacultades(res.facultades);
      }else{
        const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
        const params = { servicio: endpoint };
        const res = await GET(params);
        setFacultades(res.facultades);        
      }
    }
    fetchData();
  }, {});

  //const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => setFacultades({}), []);

  return (
    <div>
      <NombrePrincipal titulo="Facultades" />
      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        <Grid item style={{marginRight:"3%",marginTop:"1%"}}>
        {getUser().rol==="Administrador" &&
          <RegistrarFacultad flag={flag2} setFlag={setFlag1}/>}
        </Grid>       
      </Grid>
      <ListaFacultades flag={flag1} setFlag={setFlag2}/>   
    </div>
  );
};

export default Facultades;

import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TablaCoordinador from "../../components/Administrador/RegistrarCoordinador/TablaCoordinador";
import RegistrarCoordinador from "../../components/Administrador/RegistrarCoordinador/RegistrarCoordinador";
import ListaCoordinadores from "../../components/Administrador/RegistrarCoordinador/ListaCoordinadores";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, IconButton } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

const Coordinador = () => {
  const [coordinadores, setCoordinadores] = useState([]);
  const [flag1,setFlag1]=useState(0);
  const [flag2,setFlag2]=useState(0);

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/coordinador";
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res){
        setCoordinadores(res.coordinadores);
      }      
    }
    fetchData();
  }, {});
  async function fetchData() {
    const endpoint = "/api/coordinador";
    const params = { servicio: endpoint };
    const res = await GET(params);
    if (res){
      //console.log(res.coordinadores);
    }
    setCoordinadores(res.coordinadores);
  }
  const forceUpdate = React.useCallback(() => setCoordinadores({}), []);
  
  return (
    <div>
      <NombrePrincipal titulo="Coordinadores" />
      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        <Grid item style={{marginRight:"3%",marginTop:"1%"}}>
        <RegistrarCoordinador flag={flag2} setFlag={setFlag1}/>
        </Grid>       
      </Grid>
      <ListaCoordinadores coordinadores={coordinadores} flag={flag1} setFlag={setFlag2}/>   
    </div>
  );
};

export default Coordinador;

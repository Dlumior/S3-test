import { GET } from "../../Conexion/Controller";
import React,{ Component, useEffect,useState } from "react";
import { Grid, Paper, IconButton } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaCoordinadores from "../../components/Administrador/RegistrarCoordinador/ListaCoordinadores";
import ListaUnidadApoyo from "./ListaUnidadApoyo"
import RegistrarUnidadApoyo from "./RegistrarUnidadApoyo"

const UnidadApoyo = () => {
  const [unidades, setUnidades] = useState([]);
  const [flag1,setFlag1]=useState(0);//actualizacion entre hermanos
  const [flag2,setFlag2]=useState(0);

  useEffect(() => {
    async function fetchData() {
        const endpoint = "/api/areaapoyo";
        const params = { servicio: endpoint };
        const res = await GET(params);
        if (res){
          setUnidades(res.areasApoyo);
        }
    }
    fetchData();
  }, {});

  return (
    <div>
      <NombrePrincipal titulo="Unidades de apoyo" />  

      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        <Grid item style={{marginRight:"3%",marginTop:"1%"}}>
          {<RegistrarUnidadApoyo flag={flag2} setFlag={setFlag1}/>}
        </Grid>  

      </Grid>
      {<ListaUnidadApoyo unidades={unidades} flag={flag1} setFlag={setFlag2}/> }
    </div>
  );
};

export default UnidadApoyo;

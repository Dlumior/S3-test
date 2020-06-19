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

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/coordinador";
      const params = { servicio: endpoint };
      const res = await GET(params);
      setCoordinadores(res.coordinadores);
    }
    fetchData();
  }, {});
  async function fetchData() {
    const endpoint = "/api/coordinador";
    const params = { servicio: endpoint };
    const res = await GET(params);
    console.log(res.coordinadores);
    setCoordinadores(res.coordinadores);
  }
  const forceUpdate = React.useCallback(() => setCoordinadores({}), []);
  
  return (
    <div>
      <NombrePrincipal titulo="Coordinadores" />
      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        <Grid item>
        <RegistrarCoordinador/>
        </Grid>
        <Grid item>
        <IconButton color="primary" onClick={forceUpdate}>
        <RefreshRoundedIcon
          color="primary">
        </RefreshRoundedIcon>
        </IconButton>
        </Grid>        
      </Grid>
      <ListaCoordinadores coordinadores={coordinadores} />   
    </div>
  );
};

export default Coordinador;

import React,{ Component, useEffect,useState } from "react";
import RegistrarFacultad from "../../components/Administrador/Facultades/RegistrarFacultad";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaFacultades from "../../components/Administrador/Facultades/ListaFacultades";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles, IconButton } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

const Facultades = () => {
  const [facultades, setFacultades] = useState([]);
  //const [update,setUpdate]=useState(false);

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/facultad";
      const params = { servicio: endpoint };
      const res = await GET(params);
      setFacultades(res.facultades);
    }
    fetchData();
  }, {});

  //const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => setFacultades({}), []);

  return (
    <div>
      <NombrePrincipal titulo="Facultades" />
      <Grid container md={12} justify="flex-end" alignItems="center" spacing={1}>
        <Grid item>
        <RegistrarFacultad/>
        </Grid>
        <Grid item>
        <IconButton color="primary" onClick={forceUpdate}>
        <RefreshRoundedIcon
          color="primary">
        </RefreshRoundedIcon>
        </IconButton>
        </Grid>        
      </Grid>
      <ListaFacultades facultades={facultades} />   
    </div>
  );
};

export default Facultades;

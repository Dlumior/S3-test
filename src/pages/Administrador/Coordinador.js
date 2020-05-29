import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TablaCoordinador from "../../components/Administrador/RegistrarCoordinador/TablaCoordinador";
import RegistrarCoordinador from "../../components/Administrador/RegistrarCoordinador/RegistrarCoordinador";
import ListaCoordinadores from "../../components/Administrador/RegistrarCoordinador/ListaCoordinadores";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";

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

  
  return (
    <div>
      <NombrePrincipal titulo="Coordinadores" />
      <Grid container justify="flex-end" spacing={1}>
        <RegistrarCoordinador/>
      </Grid>
      <ListaCoordinadores coordinadores={coordinadores} />   
    </div>
  );
};

export default Coordinador;

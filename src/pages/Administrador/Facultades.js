import React,{ Component, useEffect,useState } from "react";
import RegistrarFacultad from "../../components/Administrador/Facultades/RegistrarFacultad";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaFacultades from "../../components/Administrador/Facultades/ListaFacultades";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";

const Facultades = () => {
  const [facultades, setFacultades] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/facultad";
      const params = { servicio: endpoint };
      const res = await GET(params);
      setFacultades(res.facultades);
    }
    fetchData();
  }, {});


  return (
    <div>
      <NombrePrincipal titulo="Facultades" />
      <Grid container justify="flex-end" spacing={1}>
        <RegistrarFacultad/>
      </Grid>
      <ListaFacultades facultades={facultades} />   
    </div>
  );
};

export default Facultades;

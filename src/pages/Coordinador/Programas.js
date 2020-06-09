import React,{ Component, useEffect,useState } from "react";
import { GET } from "../../Conexion/Controller";

import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import RegistrarProgramas from "../../components/Coordinador/FormRegistroProgramas/RegistrarProgramas";
import ListaProgramas from "../../components/Coordinador/FormRegistroProgramas/ListaProgramas";

const Programas = () => {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/programa";
      const params = { servicio: endpoint };
      const res = await GET(params);
      setProgramas(res.programas);
    }
    fetchData();
  }, {}
  
);

  return (
    <div>
      <NombrePrincipal titulo="Programas" />
      <Grid container justify="flex-end" spacing={1}>
        <RegistrarProgramas/>
      </Grid>
      <ListaProgramas programas={programas} /> 
    </div>
  );
};

export default Programas;

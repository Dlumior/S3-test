import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import ConfigurarInstitucion from "../../components/Administrador/Institucion/ConfigurarInstitucion";

const Institucion = () => {
  const [datos, setDatos] = useState([]);

  /*
  useEffect(() => {
    
    async function fetchData() {
      const endpoint = "/api/institucion";
      const params = { servicio: endpoint };
      const res = await GET(params);
      setDatos(res.facultades);
    }
    fetchData();
  }, {});
  */

  return (
    <div>
      <NombrePrincipal titulo="Configuracion de la Institución" />
      <ConfigurarInstitucion/>
    </div>
  );
};

export default Institucion;

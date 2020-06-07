import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import ConfigurarInstitucion from "../../components/Administrador/Institucion/ConfigurarInstitucion";

const Institucion = () => {
  /*
  const [institucion, setInstitucion] = useState("");

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/institucion";
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("institu:", res);
      setInstitucion(res.Institucion);
      console.log("institu:", institucion);
    }
     fetchData();
  }, {});
*/
  return (
    <div>
      <NombrePrincipal titulo="Configuracion de la Institución" />
      <ConfigurarInstitucion />
    </div>
  );
};

export default Institucion;

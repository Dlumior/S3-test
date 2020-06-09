import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import ConfigurarInstitucion from "../../components/Administrador/Institucion/ConfigurarInstitucion";

const Institucion = () => {

  const [institucion, setInstitucion] = useState({});
/*
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/institucion";
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("institu:", res.institucion);
      setInstitucion(res.institucion);
      console.log("institu:", institucion);
    }
     fetchData();
  }, {});
  */
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/institucion/";
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log(res.institucion);
      setInstitucion(res.institucion);
      console.log(institucion);
    }
    if (institucion !== "") {
      fetchData();
    }
  }, []);
  
  return (
    <div>
      <NombrePrincipal titulo="Configuracion de la Institución" />
      <ConfigurarInstitucion />
      {/*<ConfigurarInstitucion institucion={institucion}/>*/}
    </div>
  );
};

export default Institucion;

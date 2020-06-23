import React,{ Component, useEffect,useState } from "react";
import { GET } from "../../Conexion/Controller";

import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import RegistrarProgramas from "../../components/Coordinador/FormRegistroProgramas/RegistrarProgramas";
import ListaProgramas from "../../components/Coordinador/FormRegistroProgramas/ListaProgramas";
import ComboBoxFacus from "../../components/Coordinador/FormRegistroProgramas/ComboBoxFacus";
import { getUser } from "../../Sesion/Sesion";

const Programas = () => {
  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState([]);
  /*
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/programa";
      const params = { servicio: endpoint };
      const res = await GET(params);
      setProgramas(res.programas);
    }
    fetchData();
  }, {});
  */
  useEffect(() => {
    async function fetchData() {
      console.log("idCoordinador: ",getUser().usuario.ID_USUARIO);
      const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("facultades:", res);
      setFacultades(res.facultades);
      console.log("facultades:", facultades);
    }
    fetchData();
  }, {});

  return (    
    <div>
      <NombrePrincipal titulo="Programas" />
      <Grid container md={12} alignItems="flex-end" alignContent="center" justify="center">
        <Grid item md={9} >
        {getUser().rol==="Coordinador Facultad" &&
          <ComboBoxFacus
            facultades={facultades}
            facultad={facultad}
            setFacultad={setFacultad}
         /> }
        </Grid> 
        <Grid item md={2}>
          <RegistrarProgramas/>
        </Grid>
      </Grid>
      <ListaProgramas idFacu={facultad}/>
    </div>
  );
};

export default Programas;

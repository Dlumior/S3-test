import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TablaCoordinador from "../../components/Coordinador/RegistrarCoordPrograma/TablaCoordinador";
import RegistrarCoordinador from "../../components/Coordinador/RegistrarCoordPrograma/RegistrarCoordP";
import ListaCoordinadores from "../../components/Coordinador/RegistrarCoordPrograma/ListaCoordinadores";
import ComboBoxFacus from "../../components/Coordinador/RegistrarCoordPrograma/ComboBoxFacus";

import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { getUser } from "../../Sesion/Sesion";

const Coordinador = () => {
  const [coordinadores, setCoordinadores] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState([]);

  
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
      <Grid container md={12} alignItems="flex-end" alignContent="center" justify="center">
        <Grid item md={9} >
          <ComboBoxFacus
            facultades={facultades}
            facultad={facultad}
            setFacultad={setFacultad}
          /> 
        </Grid> 
        <Grid item md={2}>
          <RegistrarCoordinador/>
        </Grid>
      </Grid>
      <ListaCoordinadores idFacu={facultad}/>   
    </div>
  );
};

export default Coordinador;

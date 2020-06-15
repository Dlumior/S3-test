import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TablaCoordinador from "../../components/Administrador/RegistrarCoordinador/TablaCoordinador";
import RegistrarCoordinador from "../../components/Administrador/RegistrarCoordinador/RegistrarCoordinador";
import ListaCoordinadores from "../../components/Administrador/RegistrarCoordinador/ListaCoordinadores";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";

const Coordinador = () => {
  const [coordinadores, setCoordinadores] = useState([]);
  const [flag, setFlag] = useState(0);

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
    console.log(flag);

    setCoordinadores(res.coordinadores);
  }
  
  return (
    <div>
      <NombrePrincipal titulo="Coordinadores" />
      <Grid container justify="flex-end" spacing={1}>
        <RegistrarCoordinador flag={flag} setFlag={setFlag}/>
        {flag>0? fetchData():null}
      </Grid>
      <ListaCoordinadores coordinadores={coordinadores} />   
    </div>
  );
};

export default Coordinador;

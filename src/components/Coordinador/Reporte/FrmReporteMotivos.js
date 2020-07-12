import React, { useState, useEffect } from "react";

import { Paper, Grid, makeStyles } from "@material-ui/core";
import ComboBoxFacultades from "../FormRegistroTutor/ComboBoxFacultades";
import ComboBoxPrograma from "../FormRegistroTutor/comboBoxProgramas";
import * as Controller from "./../../../Conexion/Controller.js";
import { getUser } from "../../../Sesion/Sesion";
import ChartMotivosSolicitud from "./ChartMotivosSolicitud";

const useStyles = makeStyles((theme) => ({
  caja: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
}));

const FrmReporteMotivos = () => {
  const classes = useStyles();
  const idCoordinador = getUser().usuario.ID_USUARIO;
  const rolCoordinador = getUser().idRol;

  const [disabled, setDisabled] = useState(true);

  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");

  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");

  const [motivos, setMotivos] = useState([]);
  const [cantidad, setCantidad] = useState([]);

  //Funcion auxiliar para obtener las facultades del coordinador
  useEffect(() => {
    async function fetchFacultades() {
      let endpoint;
      if (rolCoordinador === 6) {
        endpoint = "/api/facultad/coordinador/" + idCoordinador;
      } else if (rolCoordinador === 2) {
        endpoint = "/api/facultad/lista/" + idCoordinador;
      }
      console.log("endpoint: " + endpoint);

      const params = { servicio: endpoint };
      const res = await Controller.GET(params);
      console.log(res);
      setFacultades(res.facultades);
    }
    fetchFacultades();
  }, [rolCoordinador, idCoordinador]);

  //Funcion para obtener los programas de una facultad
  useEffect(() => {
    async function fetchProgramas() {
      let endpoint;
      if (rolCoordinador === 6) {
        endpoint = "/api/programa/lista/" + facultad;
      } else if (rolCoordinador === 2) {
        endpoint = "/api/programa/lista/" + idCoordinador + "/" + facultad;
      }
      const params = { servicio: endpoint };
      const res = await Controller.GET(params);

      console.log("enpoint programa: " + endpoint);
      console.log("res de programas: ");
      console.log("=========");
      console.log(res);
      console.log("=========");

      if (res !== null) {
        if (rolCoordinador === 6) {
          console.log("asignando programa");
          console.log(res);
          setProgramas(res.programa);
        } else if (rolCoordinador === 2) {
          console.log("asignando programas");
          console.log(res);
          setProgramas(res.programas);
        }
      }
    }
    if (facultad !== "") {
      fetchProgramas();
    }
  }, [facultad]);

  //Funcion para obtener los datos de las encuestas
  useEffect(() => {
    async function fetchResultados() {
      let endpoint = "/api/sesion/motivosolicitud/" + programa;
      console.log("endpoint: " + endpoint);

      const params = { servicio: endpoint };
      const res = await Controller.GET(params);
      console.log(res);
      if(res){
        if (res.motivosSolicitud !== []) {
          let tot = 0;
          for(let item of res.motivosSolicitud){
              tot += item.CANTIDAD;
          }
          setMotivos(res.motivosSolicitud.map((item) => item.MOTIVO));
          setCantidad(res.motivosSolicitud.map((item) => {return ((item.CANTIDAD/tot) * 100).toFixed(2)}));
        }
      }
    }
    if (programa !== "") {
      fetchResultados();
    }
  }, [programa]);

  return (
    <Grid
      container
      // direction="column"
      spacing={5}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={10} md={8}>
        <Paper className={classes.caja}>
          <Grid container spacing={5} justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <ComboBoxFacultades
                programas={facultades}
                programa={facultad}
                setPrograma={setFacultad}
                setDisabled={setDisabled}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ComboBoxPrograma
                disabled={disabled}
                programas={programas}
                programa={programa}
                setPrograma={setPrograma}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
          <ChartMotivosSolicitud
          labels={motivos}
          data={cantidad}
        />
        </Grid>
        
     
        
      
    </Grid>
  );
};

export default FrmReporteMotivos;

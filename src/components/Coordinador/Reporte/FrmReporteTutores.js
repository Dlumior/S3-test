import React, { useState, useEffect } from "react";

import { Paper, Grid, makeStyles } from "@material-ui/core";
import ComboBoxFacultades from "../FormRegistroTutor/ComboBoxFacultades";
import ComboBoxPrograma from "../FormRegistroTutor/comboBoxProgramas";
import * as Controller from "./../../../Conexion/Controller.js";
import { getUser } from "../../../Sesion/Sesion";
import ChartHorasDisponibilidad from "./ChartHorasDisponibilidad";
import ChartHorasTutoria from "./ChartHorasTutoria";

const useStyles = makeStyles((theme) => ({
  caja: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
}));

const FrmReporteTutores = () => {
  const classes = useStyles();
  const idCoordinador = getUser().usuario.ID_USUARIO;
  const rolCoordinador = getUser().idRol;

  const [disabled, setDisabled] = useState(true);

  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");

  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");

  const [nombres, setNombres] = useState([]);
  const [horas, setHoras] = useState([]);

  const [nombres2, setNombres2] = useState([]);
  const [horas2, setHoras2] = useState([]);

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
      let endpoint = "/api/disponibilidadacumulada/" + programa;
      let endpoint2 = "/api/sesion/horastutoria/" + programa;
      const params = { servicio: endpoint };
      const params2 = { servicio: endpoint2 };
      const res = await Controller.GET(params);
      const res2 = await Controller.GET(params2);
      
      if (res.motivosSolicitud !== []) {        
        setNombres(res.motivosSolicitud.map((item) => item.NOMBRE));
        setHoras(res.motivosSolicitud.map((item) => item.TIEMPO));
      }

      if (res2.motivosSolicitud !== []) {
        setNombres2(res2.motivosSolicitud.map((item) => item.NOMBRE));
        setHoras2(res2.motivosSolicitud.map((item) => item.TIEMPO));
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
          <ChartHorasDisponibilidad
          labels={nombres}
          data={horas}
        />
        </Grid>

        <Grid item xs={12} md={6}>
            <ChartHorasTutoria
            labels={nombres2} 
            data={horas2} />
        </Grid>
        
      
    </Grid>
  );
};

export default FrmReporteTutores;

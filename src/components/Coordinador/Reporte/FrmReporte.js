import React, { useState, useEffect } from "react";

import { Paper, Grid, makeStyles, Button } from "@material-ui/core";
import ComboBoxFacultades from "../FormRegistroTutor/ComboBoxFacultades";
import ComboBoxPrograma from "../FormRegistroTutor/comboBoxProgramas";
import * as Controller from "./../../../Conexion/Controller.js";
import { getUser } from "../../../Sesion/Sesion";
import ChartSatisfaccion from "./ChartSatisfaccion";
import ChartUtilidad from "./ChartUtilidad";
import ChartUsoRecomendaciones from "./ChartUsoRecomendaciones";
import ChartSolSItuacion from "./ChartSolSItuacion";
import ChartRecomendacion from "./ChartRecomendacion";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const useStyles = makeStyles((theme) => ({
  caja: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
}));

const FrmReporte = () => {
  const classes = useStyles();
  const idCoordinador = getUser().usuario.ID_USUARIO;
  const rolCoordinador = getUser().idRol;

  const [disabled, setDisabled] = useState(true);

  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");

  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");

  const [encuestas, setEncuestas] = useState([]);
  const [procesosTuto, setProcesosTuto] = useState([]);
  const [satisfacion, setSatisfacion] = useState([]);
  const [utilidad, setUtilidad] = useState([]);
  const [ut_recomendaciones, setUt_recomendaciones] = useState([]);
  const [solSituacion, setSolSituacion] = useState([]);
  const [recomendaria, setRecomendaria] = useState([]);
  const [cantidad, setCantidad] = useState([]);

  const [data, setData] = useState([]);

  const handleDescargar = async e => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'Rep_Encuestas'
    const ws = XLSX.utils.json_to_sheet(encuestas);
    const wb = { Sheets: { 'Encuestas': ws }, SheetNames: ['Encuestas'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const datos = await new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(datos, fileName + fileExtension);
  }

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
      if (res){
        setFacultades(res.facultades);
      }
      
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
          if (res){
            setProgramas(res.programa);
          }          
        } else if (rolCoordinador === 2) {
          console.log("asignando programas");
          console.log(res);
          if (res){
            setProgramas(res.programas);
          }          
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
      let endpoint = "/api/encuesta/tutoria/" + programa;
      console.log("endpoint: " + endpoint);

      const params = { servicio: endpoint };
      const res = await Controller.GET(params);
      console.log(res);
      if (res){
        setEncuestas(res.encuestas);
        if (res.encuestas !== []) {
          setProcesosTuto(res.encuestas.map((item) => item.PROCESO_TUTORIA));
          setSatisfacion(res.encuestas.map((item) => item.SATISFACCION));
          setUtilidad(res.encuestas.map((item) => item.UTILIDAD));
          setUt_recomendaciones(
            res.encuestas.map((item) => item.UTILIZO_RECOMENDACIONES)
          );
          setSolSituacion(res.encuestas.map((item) => item.SOLUCIONO_SITUACION));
          setRecomendaria(res.encuestas.map((item) => item.RECOMENDARIA));
          setCantidad(res.encuestas.map((item) => item.CANTIDAD));
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
            <Grid item xs={12} md={5}>
              <ComboBoxFacultades
                programas={facultades}
                programa={facultad}
                setPrograma={setFacultad}
                setDisabled={setDisabled}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <ComboBoxPrograma
                disabled={disabled}
                programas={programas}
                programa={programa}
                setPrograma={setPrograma}
              />
            </Grid>
            <Grid item xs={12} md={2}>
            <Button id = "btnGuardar" color="primary" variant="contained" onClick = {(e) => handleDescargar(e)} disabled = {!encuestas.length}>
                Descargar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartSatisfaccion labels={procesosTuto} data={satisfacion} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartUtilidad labels={procesosTuto} data={utilidad} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ChartUsoRecomendaciones
          labels={procesosTuto}
          dataSi={ut_recomendaciones}
          cant={cantidad}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ChartSolSItuacion
          labels={procesosTuto}
          dataSi={solSituacion}
          cant={cantidad}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ChartRecomendacion
          labels={procesosTuto}
          dataSi={recomendaria}
          cant={cantidad}
        />
      </Grid>
    </Grid>
  );
};

export default FrmReporte;

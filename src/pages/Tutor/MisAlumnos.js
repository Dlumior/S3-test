import React, { useState, useEffect } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import Buscador from "../../components/Tutor/ListarAlumnos/Buscador";
import ComboBoxProcesoTutoria from "../../components/Tutor/ListarAlumnos/ComboBoxProcesoTutoria";
import ListaAlumnos from "../../components/Tutor/ListarAlumnos/ListaAlumnos";
import { Grid } from "@material-ui/core";
import { GET } from "../../Conexion/Controller";
import ComboBoxPrograma from "../../components/Tutor/ListarAlumnos/ComboBoxPrograma";
import { getUser } from "../../Sesion/Sesion";
import { defaultProps } from "recompose";

const MisAlumnos = (props) => {
  // const idTutor = "50";
  const {history}=props;
  const [tutor, setTutor] = useState({});
  const [programas, setProgramas] = useState(
    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs
  );
  const [programa, setPrograma] = useState("");
  const [pDisabled, setPDisabled] = useState(true);
  const [procesosTutoria, setProcesosTutoria] = useState([]);
  const [procesoTutoria, setProcesoTutoria] = useState("");
  const [texto, setTexto] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  //Funcion auxiliar para obtener al tutor y los programas
  // useEffect(() => {
  //   async function fetchData() {
  //     // const endpoint = "/api/tutor/" + idTutor;
  //     // const params = { servicio: endpoint };
  //     // const res = await GET(params);
  //     const res = getUser().usuario;

  //     // setTutor(res.data);
  //     setProgramas(res.data.ROL_X_USUARIO_X_PROGRAMAs);
  //   }
  //   fetchData();
  // }, []);

  //Funcion para obtener los procesos de tutoria
  useEffect(() => {
    async function fetchData() {
      const endpoint =
        "/api/tutoria/lista/"+ programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res){
        setProcesosTutoria(res.tutoria);
      }
    }
    if (programa !== "") {
      fetchData();
    }
    // fetchData();
  }, [programa]);

  //Funcion para obtener los alumnos por el buscador
  useEffect(() => {
    async function fetchData() {
      const endpoint =
        "/api/alumno/buscar/" +
        getUser().usuario.ID_USUARIO +
        "/" +
        procesoTutoria +
        "/" +
        texto;
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      // console.log(res.alumnos);
      if (res){
        setAlumnos(res.alumnos);
      }
    }
    if (procesoTutoria !== "" && texto !== "") {
      fetchData();
    }
  }, [texto]);

  //Obtener a los alumnos una vez seleccionado el programa y el procesos de tutoria
  useEffect(() => {
    async function fetchData() {
      const endpoint =
        "/api/alumno/lista/" +
        getUser().usuario.ID_USUARIO +
        "/" +
        procesoTutoria;
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log(res.alumnos);
      if (res !== []) {
        setAlumnos(res.alumnos);
      }
    }
    if (procesoTutoria !== "") {
      fetchData();
    }
  }, [procesoTutoria]);

  return (
    <div>
      <NombrePrincipal titulo="Alumnos por Proceso de Tutoria de un Programa" />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <ComboBoxPrograma
              setPDisabled={setPDisabled}
              programas={programas}
              programa={programa}
              setPrograma={setPrograma}
            />
          </Grid>
          <Grid item>
            <ComboBoxProcesoTutoria
              pDisabled={pDisabled}
              procesosTutoria={procesosTutoria}
              procesoTutoria={procesoTutoria}
              setProcesoTutoria={setProcesoTutoria}
            />
          </Grid>
          <Grid item>
            <Buscador texto={texto} setTexto={setTexto} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ListaAlumnos alumnos={alumnos} history={props.history}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default MisAlumnos;

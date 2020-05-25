import React, { useState, useEffect } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import Buscador from "../../components/Tutor/ListarAlumnos/Buscador";
import ComboBoxProcesoTutoria from "../../components/Tutor/ListarAlumnos/ComboBoxProcesoTutoria";
import ListaAlumnos from "../../components/Tutor/ListarAlumnos/ListaAlumnos";
import { Grid } from "@material-ui/core";
import { GET } from "../../Conexion/Controller";
import ComboBoxPrograma from "../../components/Tutor/ListarAlumnos/ComboBoxPrograma";

const MisAlumnos = () => {
  const idTutor = "50";
  const [tutor, setTutor] = useState({});
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");
  const [pDisabled, setPDisabled] = useState(true);
  const [procesosTutoria, setProcesosTutoria] = useState([]);
  const [procesoTutoria, setProcesoTutoria] = useState("");
  const [texto, setTexto] = useState("");
  const [alumnos, setAlumnos] = useState([]);

  //Funcion auxiliar para obtener al tutor y los programas
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/tutor/" + idTutor;
      const params = { servicio: endpoint };
      const res = await GET(params);
      setTutor(res.data);
      setProgramas(res.data.USUARIO_X_PROGRAMAs);
    }
    fetchData();
  }, []);

  //Funcion para obtener los procesos de tutoria
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/tutoria/lista/" + idTutor + "/" + programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      setProcesosTutoria(res.tutoria);
    }
    if (programa !== "") {
      fetchData();
    }
    // fetchData();
  }, [programa]);

  //Funcion para obtener los alumnos
  useEffect(() => {
    async function fetchData() {
      const endpoint =
        "/api/alumno/buscar/" + idTutor + "/" + procesoTutoria + "/" + texto;
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      // console.log(res.alumnos);

      setAlumnos(res.alumnos);
    }
    if (procesoTutoria !== "" && texto !== "") {
      fetchData();
    }
  }, [procesoTutoria, texto]);

  return (
    <div>
      <NombrePrincipal titulo="Mis Alumnos" />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <Buscador texto={texto} setTexto={setTexto} />
          </Grid>
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
        </Grid>
        <Grid item xs={12}>
          <ListaAlumnos alumnos={alumnos} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MisAlumnos;

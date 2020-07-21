import React, { useState, useEffect } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ListaSolicitudes from "../../components/Tutor/ListarSolicitudes/ListaSolicitudes";
import { Grid, Divider, Paper, makeStyles } from "@material-ui/core";
import CBoxProcesoTutoria from "../../components/Tutor/ListarSolicitudes/CBoxProcesoTutoria";
import { GET } from "../../Conexion/Controller";
import ComboBoxPrograma from "../../components/Tutor/ListarAlumnos/ComboBoxPrograma";
import ComboBoxProcesoTutoria from "../../components/Tutor/ListarAlumnos/ComboBoxProcesoTutoria";
import { getUser } from "../../Sesion/Sesion";

const useStyles = makeStyles((theme) => ({
  caja: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
  },
}));

const Solicitudes = () => {
  const classes = useStyles();

  const idTutor = getUser().usuario.ID_USUARIO;
  const [tutor, setTutor] = useState({});
  const [programas, setProgramas] = useState(
    getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs
  );
  const [programa, setPrograma] = useState("");
  const [pDisabled, setPDisabled] = useState(true);
  const [procesosTutoria, setProcesosTutoria] = useState([]);
  const [procesoTutoria, setProcesoTutoria] = useState("");
  const [solicitudes, setSolicitudes] = useState([]);

  //Funcion auxiliar para obtener al tutor y los programas
  // useEffect(() => {
  //   async function fetchData() {
  //     const endpoint = "/api/tutor/" + idTutor;
  //     const params = { servicio: endpoint };
  //     const res = await GET(params);
  //     setTutor(res.data);
  //     setProgramas(res.data.USUARIO_X_PROGRAMAs);
  //   }
  //   fetchData();
  // }, []);

  //Funcion para obtener los procesos de tutoria
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/tutoriafijasolicitada/" + programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res){
        setProcesosTutoria(res.tutoria);
      }
    }
    if (programa !== "") {
      fetchData();
    }
  }, [programa]);

  //Obtener las solicitudes una vez seleccionado el programa y el procesos de tutoria
  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/solicitud/" + idTutor + "/" + procesoTutoria;
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res !== []) {
        setSolicitudes(res.solicitudes);
      }
    }
    if (procesoTutoria !== "") {
      fetchData();
    }
  }, [procesoTutoria]);

  return (
    <>
      <NombrePrincipal titulo="Solicitudes de tutor" />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.caja}>
            <Grid container justify="center" alignItems="center">
              <Grid item md={6} xs={12}>
                <ComboBoxPrograma
                  setPDisabled={setPDisabled}
                  programas={programas}
                  programa={programa}
                  setPrograma={setPrograma}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ComboBoxProcesoTutoria
                  pDisabled={pDisabled}
                  procesosTutoria={procesosTutoria}
                  procesoTutoria={procesoTutoria}
                  setProcesoTutoria={setProcesoTutoria}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <ListaSolicitudes solicitudes={solicitudes} />
        </Grid>
      </Grid>
    </>
  );
};

export default Solicitudes;

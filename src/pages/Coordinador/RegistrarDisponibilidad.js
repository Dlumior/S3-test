import React, { useEffect, useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ComboBoxPrograma from "../../components/Coordinador/FormRegistroTutor/comboBoxProgramas";
// import ComboBoxPrograma from "../../components/Tutor/ListarAlumnos/ComboBoxPrograma";
import { GET } from "../../Conexion/Controller";
import parsearTutores from "../../components/Coordinador/RegistrarDisponibilidad/parsearTutores";
import TablaTutores from "../../components/Coordinador/RegistrarDisponibilidad/TablaTutores";
import { Grid, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  caja: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    // width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
  },
}));

const RegistrarDisponibilidad = () => {
  const classes = useStyles();

  const idCoordinador = "240";
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState(-1);
  const [tutores, setTutores] = useState({
    columns: [
      {
        title: "Código",
        field: "codigo",
      },
      {
        title: "Nombre",
        field: "nombre",
      },
      { title: "Correo Electrónico", field: "correo" },
      { title: "", field: "calendar" },
    ],
    data: [],
  });

  //Funcion auxiliar para obtener el coordinador y sus programas
  useEffect(() => {
    async function fetchProgramas() {
      const endpoint = "/api/coordinador/" + idCoordinador;
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log(res.coordinador.PROGRAMAs);
      setProgramas(res.coordinador.PROGRAMAs);
    }
    fetchProgramas();
  }, [idCoordinador]);

  //FUncion para obtener a los tutores de un programa
  useEffect(() => {
    async function fetchTutores() {
      const endpoint = "/api/tutor/lista/" + programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      const auxTutores = parsearTutores(res.tutores);
      console.log(auxTutores);
      setTutores({ ...tutores, data: auxTutores.data });
      //setTutores(res.tutores);
    }
    if (programa !== -1) {
      fetchTutores();
    }
  }, [programa]);

  return (
    <>
      <NombrePrincipal titulo="Registrar disponibilidad" />
      <Grid container justify="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.caja}>
            <ComboBoxPrograma
              programas={programas}
              programa={programa}
              setPrograma={setPrograma}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={11}>
          <TablaTutores columnas={tutores.columns} datos={tutores.data} />
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrarDisponibilidad;

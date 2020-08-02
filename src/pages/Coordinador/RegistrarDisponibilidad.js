import React, { useEffect, useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ComboBoxPrograma from "../../components/Coordinador/FormRegistroTutor/comboBoxProgramas";
// import ComboBoxPrograma from "../../components/Tutor/ListarAlumnos/ComboBoxPrograma";
import { GET } from "../../Conexion/Controller";
import parsearTutores from "../../components/Coordinador/RegistrarDisponibilidad/parsearTutores";
import TablaTutores from "../../components/Coordinador/RegistrarDisponibilidad/TablaTutores";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { getUser } from "../../Sesion/Sesion";
import ComboBoxFacultades from "../../components/Coordinador/FormRegistroTutor/ComboBoxFacultades";

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

  const idCoordinador = getUser().usuario.ID_USUARIO;
  const rolCoordinador = getUser().idRol;

  const [disabled, setDisabled] = useState(true);

  // const [programas, setProgramas] = useState(
  //   getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs
  // );
  // const [programa, setPrograma] = useState(-1);

  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");

  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");

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

  useEffect(() => {
    async function fetchFacultades() {
      let endpoint;
      if (rolCoordinador === 6) {
        endpoint = "/api/facultad/coordinador/" + idCoordinador;
      } else if (rolCoordinador === 2) {
        endpoint = "/api/facultad/lista/" + idCoordinador;
      }
      //console.log("endpoint: " + endpoint);

      const params = { servicio: endpoint };
      const res = await GET(params);
      //console.log(res);
      if (res){
        setFacultades(res.facultades);
        if(res.facultades[0]){
          if (rolCoordinador === 6){
            setFacultad(res.facultades[0].ID_PROGRAMA)
          }else{
            setFacultad(res.facultades[0].FACULTAD.ID_PROGRAMA)
          }          
        }
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
      const res = await GET(params);

      //console.log("enpoint programa: " + endpoint);
      //console.log("res de programas: ");
      //console.log("=========");
      //console.log(res);
      //console.log("=========");

      if (res !== null) {
        if (rolCoordinador === 6) {
          //console.log("asignando programa");
          //console.log(res);
          setProgramas(res.programa);
          if(res.programa[0]){
            setPrograma(res.programa[0].ID_PROGRAMA)
            console.log("asdf", programa)
          }
        } else if (rolCoordinador === 2) {
          //console.log("asignando programas");
          //console.log(res);
          setProgramas(res.programas);
          if(res.programas[0]){
            setPrograma(res.programas[0].ID_PROGRAMA)
            console.log("asdf", programa)
          }
        }
      }
    }
    if (facultad !== "") {
      fetchProgramas();
    }
  }, [facultad]);

  //Funcion auxiliar para obtener el coordinador y sus programas
  // useEffect(() => {
  //   async function fetchProgramas() {
  //     const endpoint = "/api/coordinador/" + idCoordinador;
  //     const params = { servicio: endpoint };
  //     const res = await GET(params);
  //     //console.log(res.coordinador.PROGRAMAs);
  //     setProgramas(res.coordinador.PROGRAMAs);
  //   }
  //   fetchProgramas();
  // }, [idCoordinador]);

  //FUncion para obtener a los tutores de un programa
  useEffect(() => {
    async function fetchTutores() {
      const endpoint = "/api/tutor/lista/" + programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res){
        const auxTutores = parsearTutores(res.tutores, facultad);
        //console.log(auxTutores);
        setTutores({ ...tutores, data: auxTutores.data });
        //setTutores(res.tutores);
      }
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
            <Grid container spacing={2}>
              {/* <ComboBoxPrograma
              programas={programas}
              programa={programa}
              setPrograma={setPrograma}
            /> */}
              <Grid item xs={12} md={6}>
                <ComboBoxFacultades
                  programas={facultades}
                  programa={facultad}
                  setPrograma={setFacultad}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ComboBoxPrograma
                  programas={programas}
                  programa={programa}
                  setPrograma={setPrograma}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={11} style={{marginBottom:"3%"}}>
          <TablaTutores columnas={tutores.columns} datos={tutores.data} />
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrarDisponibilidad;

import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper, IconButton } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormRegistroTutor from "../../components/Coordinador/FormRegistroTutor/FormRegistroTutor.js";
import BtnRegistroTutor from "../../components/Coordinador/FormRegistroTutor/BtnRegistroTutor";
import ComboBoxFacultades from "../../components/Coordinador/FormRegistroTutor/ComboBoxFacultades";
import ComboBoxPrograma from "../../components/Coordinador/FormRegistroTutor/comboBoxProgramas";
import ParseTutors from "../../components/Coordinador/FormRegistroTutor/TablaTutores/ParseTutors";
import TableTutores from "../../components/Coordinador/FormRegistroTutor/TablaTutores/TableTutores";
import { GET } from "../../Conexion/Controller";
import { getUser } from "../../Sesion/Sesion";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";

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

const RegistrarTutor = () => {
  const classes = useStyles();
  const [datosForm, setDatosForm] = useState({
    NOMBRE: "",
    APELLIDOS: "",
    CODIGO: "",
    CORREO: "",
    TELEFONO: "",
    DIRECCION: "",
    USUARIO: "",
    CONTRASENHA: "contra",
    IMAGEN: "",
    PROGRAMA: [],
  });

  const idCoordinador = getUser().usuario.ID_USUARIO;
  const rolCoordinador = getUser().idRol;

  const [disabled, setDisabled] = useState(true);

  const [facultades, setFacultades] = useState([]);
  const [facultad, setFacultad] = useState("");

  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState("");

  const forceUpdate = () => window.location.reload();

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
      { title: "Modificar Tutor", field: "modificar" },
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
      if (res) {
        setFacultades(res.facultades);
        if (res.facultades[0]) {
          if (rolCoordinador === 6) {
            setFacultad(res.facultades[0].ID_PROGRAMA);
          } else {
            setFacultad(res.facultades[0].FACULTAD.ID_PROGRAMA);
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
          if (res.programa[0]) {
            setPrograma(res.programa[0].ID_PROGRAMA);
            console.log("asdf", programa);
          }
        } else if (rolCoordinador === 2) {
          //console.log("asignando programas");
          //console.log(res);
          setProgramas(res.programas);
          if (res.programas[0]) {
            setPrograma(res.programas[0].ID_PROGRAMA);
            console.log("asdf", programa);
          }
        }
      }
    }
    if (facultad !== "") {
      fetchProgramas();
    }
  }, [facultad]);

  //FUncion para obtener a los tutores de un programa
  useEffect(() => {
    async function fetchTutores() {
      const endpoint = "/api/tutor/lista/" + programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res) {
        const auxTutores = ParseTutors(res.tutores, facultad, programa);
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
    <div>
      <NombrePrincipal titulo="Tutores" />

      {/* <Grid container spacing={5} justify="center" alignItems="center">
        <Grid item>
          <BtnRegistroTutor datos={datosForm} setDatos={setDatosForm} />
        </Grid>
      </Grid> */}

      <Grid container justify="center" alignItems="center" spacing={4} md={12}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.caja}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={10} md={4}>
                <ComboBoxFacultades
                  programas={facultades}
                  programa={facultad}
                  setPrograma={setFacultad}
                />
              </Grid>
              <Grid item xs={10} md={4}>
                <ComboBoxPrograma
                  programas={programas}
                  programa={programa}
                  setPrograma={setPrograma}
                />
              </Grid>
              <Grid item xs={10} md={2}>
                <BtnRegistroTutor datos={datosForm} setDatos={setDatosForm} />
              </Grid>
              {/*<Grid item xs={2} md={1}>
                <IconButton color="primary" onClick={forceUpdate}>
                  <RefreshRoundedIcon color="primary"></RefreshRoundedIcon>
                </IconButton>
              </Grid>*/}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={11} style={{ marginBottom: "3%" }}>
          <TableTutores columnas={tutores.columns} datos={tutores.data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrarTutor;

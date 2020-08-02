import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ListaFacultades from "./ComboBoxFacultades";
import ListaProgramas from "./ListaProgramas";
import ListaProcesoTut from "./ListaProcesoTut";
import ListaTutores from "./ListaTutores";
import ListaAlumnos from "./ListaAlumnosPorPrograma";
import { GET } from "../../../Conexion/Controller";
import * as Controller from "../../../Conexion/Controller";
import Alertas from "../../Coordinador/Alertas";
import { getUser } from "../../../Sesion/Sesion";
import { Grid } from "@material-ui/core";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import ImportarAlumnosAsignacion from "./ImportarAlumnosAsignacion";
import moment from 'moment';

const style = {
  paper: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    backgroundImage: "",
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Seleccionar Facultad",
    "Seleccionar Programa",
    "Seleccionar Proceso de Tutoria",
    "Seleccionar Tutor",
    "Seleccionar Alumno(s)",
    "Guardar",
  ];
}

const VerticalLinearStepper = () => {
  const [datosForm, setDatosForm] = React.useState({
    programa: "",
    tutor: "",
    tutoria: "",
    alumnos: [],
  });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [grupal, setGrupal] = useState(false);
  const [alumnosMasivo, setAlumnosMasivo] = useState([]);

  const [subprograma, setSubprograma] = useState([]);
  const [tutoria, setTutoria] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [programa, setPrograma] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [pDisabled, setPDisabled] = useState(true);
  const [alerta, setAlerta] = useState({
    mensajeStrong: "",
    mensajeStrongError: "por favor revisalos!",
    mensajeStrongExito: "satisfactoriamente!",
    mensajeError: "Existen errores al completar el formulario",
    mensajeExito: "Coordinador registrado",
    mensaje: "",
  });
  const [severidad, setSeveridad] = useState({
    severidad: "",
    severW: "warning",
    severE: "error",
    severS: "success",
  });

  const steps = getSteps();

  useEffect(() => {
    async function fetchData() {
      if (getUser().rol === "Coordinador Facultad") {
        const endpoint =
          "/api/facultad/coordinador/" + getUser().usuario.ID_USUARIO;
        const params = { servicio: endpoint };
        const res = await GET(params);
        //console.log("facultades:", res);
        if (res){
          if (res.facultades) {
            setProgramas(res.facultades);
          }
        }        
        //console.log("facultad:", programa);
      } else {
        const endpoint = "/api/facultad/lista/" + getUser().usuario.ID_USUARIO;
        const params = { servicio: endpoint };
        const res = await GET(params);
        //console.log("ENTREE:", res);
        if (res){
          setProgramas(res.facultades);
        }
        //console.log("facultad:", programa);
      }
    }
    fetchData();
  }, {});

  const handleNext = () => {
    if (
      (programa.length !== 0 && activeStep === 0) ||
      (subprograma.length !== 0 && activeStep === 1) ||
      (tutoria.length !== 0 && activeStep === 2) ||
      (tutor.length !== 0 && activeStep === 3) ||
      (alumnos.length !== 0 && activeStep === 4)
    ) {
      //console.log("activestep", activeStep);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSeveridad({
        severidad: "",
      });
      setAlerta({
        mensaje: "",
      });
    } else {
      setSeveridad({
        severidad: "error",
      });
      setAlerta({
        mensaje: "Debe completar todos los campos",
      });
    }
  };

  const handleBack = () => {
    setSeveridad({
      severidad: "",
    });
    setAlerta({
      mensaje: "",
    });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleOnChangePrograma = (subprograma) => {
    //console.log("subprograma: ", subprograma);
    setSubprograma(subprograma);
  };
  const handleOnChangeTutoria = (tutoria) => {
    //console.log("tutoria: ", tutoria);

    if (tutoria.GRUPAL === 0) {
      setGrupal(false);
    } else {
      setGrupal(true);
    }
    setTutoria(tutoria.ID_PROCESO_TUTORIA);
  };
  const handleOnChangeTutor = (tutor) => {
    //console.log("tutoria: ", tutor);
    setTutor(tutor.ID_TUTOR);
  };
  const handleOnChangeAlumnos = (alumnos) => {
    //console.log("alumnos: ", alumnos);
    setAlumnos(alumnos);
    //setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const nuevaAsignacion = {
      asignacionTutoria: {
        PROCESO_TUTORIA: tutoria,
        TUTOR: tutor,
        ALUMNOS: alumnos,
        FECHA_ASIGNACION: moment(new Date()).format("YYYY-MM-DD"),
      },
    };
    let asignado;
    let props;
    //console.log("grupal", grupal);
    if (grupal) {
      if (alumnos.length>1){
        props = { servicio: "/api/asignacion", request: nuevaAsignacion };
        //console.log("saving new asignacion in DB:", nuevaAsignacion);
        asignado = await Controller.POST(props);
        //console.log("asignado", asignado);
      }else{
        setSeveridad({
          severidad: "warning",
        });
        setAlerta({
          mensaje: "Los procesos de tutoria grupales deben contar como mínimo con dos alumnos",
        });
        return;
      }
    } else {
      let newasig;
      let alu;
      for (let element of alumnos) {
        alu = []; //guarda un unico alumo
        alu.push(element);
        newasig = {
          asignacionTutoria: {
            PROCESO_TUTORIA: tutoria,
            TUTOR: tutor,
            ALUMNOS: alu,
            FECHA_ASIGNACION: moment(new Date()).format("YYYY-MM-DD"),
          },
        };
        //console.log("new", newasig);
        props = { servicio: "/api/asignacion", request: newasig }; //aqui seria la asignacion grupal
        //console.log("saving new asignacion in DB:", newasig);
        asignado = await Controller.POST(props);
      }
    }

    if (asignado) {
      setSeveridad({
        severidad: severidad.severS,
      });
      setAlerta({
        mensaje: "Asignación realizada satisfactoriamente",
      });
      //alert("Alumno asignado Satisfactoriamente");
    }
    //console.log("got updated alumno from back:", asignado);
  };

  /////////////////////////////////
  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = (event) => {
    setOpen(false);
  };
  /////////////////////////////////

  function getStepContent(step) {
    switch (step) {
      // falta default case!
      case 0:
        return (
          <div>
            <ListaFacultades
              programas={programas}
              programa={programa[0]}
              setPrograma={setPrograma}
            />
          </div>
        );
      case 1:
        //console.log("fac: ", programa);
        let fac = programa;
        //console.log("fac: ", fac);

        return (
          <div>
            <ListaProgramas
              titulo={"Programas"}
              escogerPrograma={handleOnChangePrograma}
              enlace={
                getUser().rol === "Coordinador Programa"
                  ? "/api/programa/lista/" +
                    getUser().usuario.ID_USUARIO +
                    "/" +
                    programa
                  : "/api/programa/lista/" + programa
              }
            />
          </div>
        );

      case 2:
        //console.log("subprog: ", subprograma);
        return (
          <div>
            <ListaProcesoTut
              titulo={"Proceso de Tutoría"}
              escogerTutoria={handleOnChangeTutoria}
              enlace={"/api/tutoriafijaasignada/" + subprograma}
              grupal={grupal}
              proceso={tutoria}
            />
          </div>
        );
      case 3:
        //console.log("tutoria: ", tutoria);
        return (
          <div>
            <ListaTutores
              titulo={"Tutor"}
              escogerTutor={handleOnChangeTutor}
              enlace={"/api/tutor/lista/" + subprograma}
            />
          </div>
        );
      case 4:
        //console.log("tutor: ", tutor);
        return (
          <div>
            <Grid
              md={12}
              justify="flex-end"
              style={{ marginTop: "1%", marginBottom: "1%", marginLeft: "79%" }}
            >
              <Button
                color="primary"
                variant="outlined"
                onClick={handleOpen}
                startIcon={<BackupTwoToneIcon />}
              >
                Importar desde .csv
              </Button>
            </Grid>
            <ListaAlumnos
              escogerAlumnos={handleOnChangeAlumnos}
              enlace={"/api/alumno/noasignados/" + tutoria}
              programa={subprograma}
              proceso={tutoria}
            />
            {open && (
              <ImportarAlumnosAsignacion
                usuario={getUser().usuario}
                open={handleOpen}
                close={handleClose}
                escogerAlumnos={handleOnChangeAlumnos}
                programa={subprograma}
              />
            )}
          </div>
        );
      case 5:
        return (
          <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Guardar
            </Button>
          </div>
        );
    }
  }

  return (
    <div>
      <Paper elevation={0} style={style.paper}>
        <Alertas
          severity={severidad.severidad}
          titulo={"Observación:"}
          alerta={alerta}
        />
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <Typography variant="h5">{label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      variant="outlined"
                      color="primary"
                    >
                      Anterior
                    </Button>
                      {activeStep === steps.length - 1
                        ? null  : 
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                        Siguiente
                        </Button>}
                    
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Asignación Registrada Satisfactoriamente</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Volver a Empezar
            </Button>
          </Paper>
        )}
      </Paper>
    </div>
  );
};

export default VerticalLinearStepper;

import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Coordinador/BarraNavegacion.js";
import RegistrarTutor from "./RegistrarTutor.js";
import RegistrarAlumno from "./RegistrarAlumno.js";
import AsignarTutor from "./AsignarTutor.js";
import Tutorias from "./Tutorias.js";
import Programas from "./Programas";
import RegistrarDisponibilidad from "./RegistrarDisponibilidad.js";
import RegistrarCoordPrograma from "./RegistrarCoordPrograma";
import Reporte from "./Reporte.js";
import AsignarRoles from "./AsignarRoles";

import Perfil from "./Perfil.js";
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";
import { useUserValue, getUser } from "../../Sesion/Sesion.js";
import Home from "../Home/Home.js";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../theme.js";
import Facultades from "../Administrador/Facultades";

import PerfilAlumno from "../../components/Tutor/ListarAlumnos/PerfilAlumno";

const Coordinador = (props) => {
  //console.log("Coordinador", props.history.location.pathname);
  const [{ usuario, auth }, dispatch] = useUserValue();
  if (!auth) {
    props.history.push("/");
    return Home;
  } else {
    const move_to = getUser().rol.toLowerCase().split(" ")[0];
    //console.log("Ruta", move_to);

    if (move_to !== "coordinador") {
      props.history.push("/" + move_to);
    }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Route
          exact
          path="/coordinador"
          component={() => (
            <>
              <SaltoDeLinea N={3} />
              <Perfil data={props} />
            </>
          )}
        />
        {/* <Route
          exact
          path="/coordinador/registrarTutores"
          component={RegistrarTutor}
        /> */}
        <BarraNavegacion>
          {/*perfil...*/}
          <Route exact path={"/coordinador/perfil"} component={Perfil} />
          <Route
            exact
            path={"/coordinador/facultades"}
            component={Facultades}
          />

          <Route
            exact
            path={"/coordinador/tutores"}
            component={RegistrarTutor}
          />
          <Route
            exact
            path={"/coordinador/alumnos"}
            component={RegistrarAlumno}
          />
          <Route
            exact
            path="/coordinador/asignaciondeTutor"
            component={AsignarTutor}
          />
          <Route
            exact
            path="/coordinador/procesosdetutoria"
            component={Tutorias}
          />
          <Route exact path="/coordinador/programas" component={Programas} />
          <Route
            exact
            path="/coordinador/disponibilidades"
            component={RegistrarDisponibilidad}
          />
          <Route
            exact
            path="/coordinador/coordinadoresdeprograma"
            component={RegistrarCoordPrograma}
          />
          <Route exact path="/coordinador/reportes" component={Reporte} />
          <Route
            exact
            path="/coordinador/asignarroles"
            component={AsignarRoles}
          />
          <Route
            exact
            path={"/coordinador/alumno/:idAlumno/:fullname"}
            component={PerfilAlumno}
          />
        </BarraNavegacion>
      </ThemeProvider>
    </div>
  );
};

export default Coordinador;

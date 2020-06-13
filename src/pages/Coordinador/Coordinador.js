import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Coordinador/BarraNavegacion.js";
import RegistrarTutor from "./RegistrarTutor.js";
import RegistrarAlumno from "./RegistrarAlumno.js";
import AsignarTutor from "./AsignarTutor.js";
import Tutorias from "./Tutorias.js";
import Programas from "./Programas";

import Perfil from "./Perfil.js";
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";

const Coordinador = (props) => {
  console.log("props",props);
  return (
    <div>
      <Route  exact path={"/coordinador/"} component={()=><><SaltoDeLinea N={3}/><Perfil data={props}/></>} />      
      <BarraNavegacion>
        {/*perfil...*/}
        <Route exact path={"/coordinador/perfil"} component={Perfil} />
        <Route
          exact
          path="/coordinador/registrarTutores"
          component={RegistrarTutor}
        />
        <Route
          exact
          path="/coordinador/registrarAlumnos"
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
        <Route
          exact
          path="/coordinador/programas"
          component={Programas}
        />
      </BarraNavegacion>
    </div>
  );
};

export default Coordinador;

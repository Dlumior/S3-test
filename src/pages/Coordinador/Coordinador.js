import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Coordinador/BarraNavegacion.js";
import RegistrarTutor from "./RegistrarTutor.js";
import RegistrarAlumno from "./RegistrarAlumno.js";
import AsignarTutor from "./AsignarTutor.js";
import Tutorias from "./Tutorias.js";

import Perfil from "./Perfil.js";

const Coordinador = () => {
  return (
    <div>
      <Route  exact path={"/coordinador/"} component={Perfil} />      
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
          path="/coordinador/registrarprocesosdetutoria"
          component={Tutorias}
        />
      </BarraNavegacion>
    </div>
  );
};

export default Coordinador;

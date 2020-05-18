import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Coordinador/BarraNavegacion.js";
import RegistrarTutor from "./RegistrarTutor.js";
import RegistrarAlumno from "./RegistrarAlumno.js";

const Coordinador = () => {
  return (
    <div>
      <BarraNavegacion>
        <Route
          exact
          path="/coordinador/registrar_tutores"
          component={RegistrarTutor}
        />
        <Route
          exact
          path="/coordinador/registrar_alumnos"
          component={RegistrarAlumno}
        />
      </BarraNavegacion>
    </div>
  );
};

export default Coordinador;

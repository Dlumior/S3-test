import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Coordinador/BarraNavegacion.js";
import RegistrarTutor from "./RegistrarTutor.js";
import RegistrarAlumno from "./RegistrarAlumno.js";

import Perfil from "./Perfil.js";

const Coordinador = () => {
  return (
    <div>
      <BarraNavegacion>
        {/*perfil...*/}
        <Route exact path={"/coordinador/perfil"} component={Perfil} />
        <Route
          exact
          path="/coordinador/Registrar_Tutores"
          component={RegistrarTutor}
        />
        <Route
          exact
          path="/coordinador/Registrar_Alumnos"
          component={RegistrarAlumno}
        />
      </BarraNavegacion>
    </div>
  );
};

export default Coordinador;

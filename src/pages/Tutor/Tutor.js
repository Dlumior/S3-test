import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import MisAlumnos from "./MisAlumnos.js";

const Tutor = () => {
  return (
    <div>
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />
        <Route exact path={"/tutor/misalumnos"} component={MisAlumnos} />
      </BarraNavegacion>
    </div>
  );
};
export default Tutor;

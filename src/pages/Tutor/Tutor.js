import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Sesiones from "./Sesiones.js";

const Tutor = () => {
  return (
    <div>
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />
        <Route exact path={"/tutor/perfil2"} component={Perfil} />
        <Route exact path={"/tutor/perfil3"} component={Perfil} />
        <Route exact path={"/tutor/sesiones"} component={Sesiones} />
        <Route exact path={"/tutor/perfil4"} component={Perfil} />
        {/*...*/}
        <Route exact path={"/tutor/misalumnos"} component={MisAlumnos} />
      </BarraNavegacion>
    </div>
  );
};
export default Tutor;
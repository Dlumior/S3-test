import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Alumno/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import AgendarCita from "./AgendarCita.js";


const Alumno = () => {
  return (
    <div>
      <br></br> <br></br> <br></br>
      <Route  exact path={"/alumno/"} component={Perfil} />
      <BarraNavegacion>
        <Route exact path={"/alumno/perfil"} component={Perfil} />
        <Route exact path={"/alumno/agendarCita"} component={AgendarCita} />

      </BarraNavegacion>
    </div>
  );
};
export default Alumno;

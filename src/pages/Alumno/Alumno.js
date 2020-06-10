import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Alumno/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import AgendarCita from "./AgendarCita.js";
import MisCitas from "./MisCitas.js";
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";

const Alumno = () => {
  return (
    <div>
      
      <Route  exact path={"/alumno/"} component={()=><><SaltoDeLinea N={3}/><MisCitas/></>} />
      <BarraNavegacion>
        <Route exact path={"/alumno/perfil"} component={Perfil} />
        <Route exact path={"/alumno/agendarCita"} component={AgendarCita } />
        <Route exact path={"/alumno/misCitas"} component={MisCitas} />
      </BarraNavegacion>
    </div>
  );
};
export default Alumno;

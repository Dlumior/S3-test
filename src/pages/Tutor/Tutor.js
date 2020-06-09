import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import MisAlumnos from "./MisAlumnos.js";
import MiDisponibilidad from "./MiDisponibilidad.js";

//import Calendario from "./Calendario.js";
import Sesiones from "./Sesiones.js";
import Solicitudes from "./Solicitudes.js";

const Tutor = () => {
  return (
    <div>
      <br/><br/>
      <Route exact path={"/tutor/"} component={MisAlumnos} />
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />     
        <Route exact path={"/tutor/misalumnos"} component={MisAlumnos} />
        <Route exact path={"/tutor/midisponibilidad"} component={MiDisponibilidad}
        />
        {/*<Route exact path={"/tutor/calendario"} component={Calendario} />*/}
        <Route exact path={"/tutor/sesiones"} component={Sesiones} />
        <Route exact path={"/tutor/solicitudes"} component={Solicitudes} />
      </BarraNavegacion>
    </div>
  );
};
export default Tutor;

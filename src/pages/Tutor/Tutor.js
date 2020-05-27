import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Calendario from "./Calendario.js";
import MisAlumnos from "./MisAlumnos.js";
import MiDisponibilidad from "./MiDisponibilidad.js";

const Tutor = () => {
  return (
    <div>
      <br></br><br></br><br></br>
      <Route exact path={"/tutor/"} component={Perfil} />
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />
        {/*
         <Route exact path={"/tutor/perfil2"} component={Perfil} />
         <Route exact path={"/tutor/perfil3"} component={Perfil} />        
         <Route exact path={"/tutor/perfil4"} component={Perfil} />
           ... why this¿????
        */}
        <Route exact path={"/tutor/misalumnos"} component={MisAlumnos} />
        <Route
          exact
          path={"/tutor/midisponibilidad"}
          component={MiDisponibilidad}
        />
        <Route exact path={"/tutor/calendario"} component={Calendario} />
      </BarraNavegacion>
    </div>
  );
};
export default Tutor;

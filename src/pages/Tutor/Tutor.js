import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Calendario from "./Calendario.js";

const Tutor = () => {
  return (
    <div>
      <br></br> <br></br> <br></br>
      <Route  exact path={"/tutor/"} component={Perfil} />      
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />
        <Route exact path={"/tutor/perfil2"} component={Perfil} />
        <Route exact path={"/tutor/perfil3"} component={Perfil} />
        <Route exact path={"/tutor/calendario"} component={Calendario} />
        <Route exact path={"/tutor/perfil4"} component={Perfil} />
        {/*...*/}
      </BarraNavegacion>
    </div>
  );
};
export default Tutor;
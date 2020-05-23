import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";

const Tutor = () => {
  return (
    <div>
      <br></br> <br></br> <br></br>
      <Route  exact path={"/tutor/"} component={Perfil} />      
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />
        {/*...*/}
      </BarraNavegacion>
    </div>
  );
};
export default Tutor;

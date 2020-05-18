import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Administrador/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Facultades from "./Facultades.js";

const Administrador = () => {
  return (
    <div>
      <BarraNavegacion>
        {/* <Router> */}
        <Route exact path={"/administrador/perfil"} component={Perfil} />
        <Route
          exact
          path={"/administrador/facultades"}
          component={Facultades}
        />
        {/* </Router> */}
      </BarraNavegacion>
    </div>
  );
};

export default Administrador;

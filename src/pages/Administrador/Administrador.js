import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Administrador/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Facultades from "./Facultades.js";
import Coordinador from "./Coordinador";
import Institucion from "./Institucion"
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";
import { useUserValue } from "../../Sesion/Sesion.js";

const Administrador = () => {
  
  return (
    <div>
      <Route exact path={"/administrador/"} component={()=><><SaltoDeLinea N={3}/><Perfil/></>} />
      <BarraNavegacion>
        <Route exact path={"/administrador/perfil"} component={Perfil} />
        <Route
          exact
          path={"/administrador/institucion"}
          component={Institucion}
        />
        <Route
          exact
          path={"/administrador/facultades"}
          component={Facultades}
        />
        <Route
          exact
          path={"/administrador/coordinadores"}
          component={Coordinador}
        />
      </BarraNavegacion>
    </div>
  );
};

export default Administrador;

import React from "react";
import { Route } from "react-router-dom";

import BarraNavegacion from "../../components/Administrador/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import Facultades from "./Facultades.js";
import Coordinador from "./Coordinador";
import Institucion from "./Institucion"
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";
import { useUserValue, getUser } from "../../Sesion/Sesion.js";
import Home from "../Home/Home.js";

const Administrador = (props) => {
  console.log("Administrador", props.history.location.pathname);
  const [{ usuario, auth }, dispatch] = useUserValue();
  if (!auth) {
    props.history.push("/");
    return (Home)
  } else {
    const move_to = getUser().rol.toLowerCase().split(" ")[0];
    console.log("Ruta", move_to);

    if (move_to !== "administrador") {
      props.history.push("./" + move_to);
    }
  }
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

import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Alumno/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import AgendarCita from "./AgendarCita.js";
import SolicitarTutoriaFija from "./SolicitarTutoriaFija.js";

import MisCitas from "./MisCitas.js";
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";
import { useUserValue, getUser } from "../../Sesion/Sesion.js";
import Home from "../Home/Home.js";

const Alumno = (props) => {
  //console.log("Alumno", props.history.location.pathname);
  const [{ usuario, auth }, dispatch] = useUserValue();
  if (!auth) {
    props.history.push("/");
    return (Home)
  } else {
    const move_to = getUser().rol.toLowerCase().split(" ")[0];
    //console.log("Ruta", move_to);

    if (move_to !== "alumno") {
      props.history.push("/"+move_to); 
    }   
  

  return (
    <div>

      {/*
        >> meter condicional para caso de solicitar tutores FIJOS!
        ... pero seria en datos.js
        analogo a "matricula" de campus virtual

      */}
      <Route
        exact
        path={"/alumno/"}
        component={() => (
          <>
            <SaltoDeLinea N={3} />
            <MisCitas />
          </>
        )}
      />
      <BarraNavegacion>
        <Route exact path={"/alumno/solicitarTutorFijo"} component={SolicitarTutoriaFija} />
        <Route exact path={"/alumno/perfil"} component={Perfil} />
        <Route exact path={"/alumno/agendarCita"} component={AgendarCita} />
        <Route exact path={"/alumno/misCitas"} component={MisCitas} />
      </BarraNavegacion>
    </div>
  );
}};
export default Alumno;

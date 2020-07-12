import React from "react";
import { Route } from "react-router-dom";
import BarraNavegacion from "../../components/Tutor/BarraNavegacion.js";
import Perfil from "./Perfil.js";
import MisAlumnos from "./MisAlumnos.js";
import MiDisponibilidad from "./MiDisponibilidad.js";

import HistorialDeCitas from "./HistorialDeCitas.js";
import PerfilAlumno from "../../components/Tutor/ListarAlumnos/PerfilAlumno";
import SesionesGrupales from "./SesionesGrupales";


//import Calendario from "./Calendario.js";
import Sesiones from "./Sesiones.js";
import Solicitudes from "./Solicitudes.js";
import SaltoDeLinea from "../../components/Shared/SaltoDeLinea.jsx";
import { useUserValue, getUser } from "../../Sesion/Sesion.js";
import Home from "../Home/Home.js";

const Tutor = (props) => {
  console.log("Tutor", props.history.location.pathname);
  const [{ usuario, auth }, dispatch] = useUserValue();
  if (!auth) {
    props.history.push("/");
    return (Home)
  } else {
    const move_to = getUser().rol.toLowerCase().split(" ")[0];
    console.log("Ruta", move_to);
    if (move_to !== "tutor") {
      props.history.push("/" + move_to);
    }
  }
  return (
    <div>
      <Route exact path={"/tutor/"} component={()=><><SaltoDeLinea N={3}/><MisAlumnos/></>} />
      <BarraNavegacion>
        <Route exact path={"/tutor/perfil"} component={Perfil} />     
        <Route exact path={"/tutor/misalumnos"} component={MisAlumnos} />
        <Route exact path={"/tutor/midisponibilidad"} component={MiDisponibilidad}
        />
        {/*<Route exact path={"/tutor/calendario"} component={Calendario} />*/}
        <Route exact path={"/tutor/sesiones"} component={Sesiones} />
        <Route exact path={"/tutor/solicitudes"} component={Solicitudes} />
        <Route exact path={"/tutor/sesionesgrupales"} component={SesionesGrupales} />


        <Route exact path={"/tutor/misCitas"} component={HistorialDeCitas}/>    
        <Route exact path={"/tutor/mialumno/:idAlumno/:fullname"} component={PerfilAlumno}/>   


      </BarraNavegacion>
    </div>
  );
};
export default Tutor;

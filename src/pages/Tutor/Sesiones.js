import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import Calendario from "../../components/Tutor/Calendario";
import RegistrarSesion from "../../components/Tutor/RegistrarSesion";


const Sesiones = () => {
    return (

        <div>
            <NombrePrincipal titulo="Calendario de Sesiones"/>
            <Calendario/>
            <RegistrarSesion/>
        </div>
    );
};

export default Sesiones;
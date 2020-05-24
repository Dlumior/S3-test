import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmAsignacionTutor from "../../components/Coordinador/FrmAsignacionTutor";


const AsignarTutor = () => {
    return (

        <div>
            <NombrePrincipal titulo="Asignación de Tutor"/>
            <Grid container xs={12} spacing={5} justify="center" alignItems="center">
                <Grid item>
                    <FrmAsignacionTutor/>
                </Grid>
            </Grid>
        </div>
    );
};

export default AsignarTutor;


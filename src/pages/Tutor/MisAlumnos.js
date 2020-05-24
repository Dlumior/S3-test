import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import Buscador from "../../components/Tutor/Buscador";
import ComboBoxProcesoTutoria from "../../components/Tutor/ComboBoxProcesoTutoria";
import ListaAlumnos from "./ListaAlumnos";
import { Grid } from "@material-ui/core";

const MisAlumnos = () => {
  return (
    <div>
      <NombrePrincipal titulo="Mis Alumnos" />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <Buscador />
          </Grid>
          <Grid item>
            <ComboBoxProcesoTutoria />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ListaAlumnos />
        </Grid>
      </Grid>
    </div>
  );
};

export default MisAlumnos;

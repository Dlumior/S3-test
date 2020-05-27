import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormRegistroTutor from "../../components/Coordinador/FormRegistroTutor/FormRegistroTutor.js";

const RegistrarTutor = () => {
  const [datosForm, setDatosForm] = useState({
    name: "",
    lastnames: "",
    code: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
    imagen: "",
  });

  return (
    <div>
      <NombrePrincipal titulo="Registro de nuevos Tutores" />

      <Grid container xs={12} spacing={5} justify="center" alignItems="center">
        <Grid item>
          <FormRegistroTutor datos={datosForm} setDatos={setDatosForm} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrarTutor;

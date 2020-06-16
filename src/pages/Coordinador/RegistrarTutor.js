import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormRegistroTutor from "../../components/Coordinador/FormRegistroTutor/FormRegistroTutor.js";

const RegistrarTutor = () => {
  const [datosForm, setDatosForm] = useState({
    NOMBRE: "",
    APELLIDOS: "",
    CODIGO: "",
    CORREO: "",
    TELEFONO: "",
    DIRECCION: "",
    USUARIO: "",
    CONTRASENHA: "contra",
    IMAGEN: "",
    PROGRAMA: [],
  });

  return (
    <div>
      <NombrePrincipal titulo="Registro de nuevos Tutores" />

      <Grid container spacing={5} justify="center" alignItems="center">
        <Grid item>
          <FormRegistroTutor datos={datosForm} setDatos={setDatosForm} />
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrarTutor;

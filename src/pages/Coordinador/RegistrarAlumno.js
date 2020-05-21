import React from "react";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormularioRegistrarAlumno";
import CabeceraRegistrarAlumno from "../../components/Coordinador/CabeceraRegistrarAlumno";
import { Container } from "@material-ui/core";


const titulo = "Registrar Alumno";
const RegistrarAlumno = () => {
  return (

    <Container fullWidth disableGutters maxWidth={"xl"}>
      <CabeceraRegistrarAlumno titulo={titulo} />
      <FormularioRegistrarAlumno />
    </Container>
  );
};

export default RegistrarAlumno;


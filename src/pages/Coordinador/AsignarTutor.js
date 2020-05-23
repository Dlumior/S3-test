import React from "react";
import { Container } from "@material-ui/core";


const AsignarTutor = () => {
  return (

    <Container fullWidth disableGutters maxWidth={"xl"}>
      <Cabecera titulo="Asignar Tutor" />
      <FormularioAsignarTutor/>
    </Container>
  );
};

export default AsignarTutor;


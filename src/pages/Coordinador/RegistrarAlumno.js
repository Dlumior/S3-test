import React from "react";
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormularioRegistrarAlumno";
import CabeceraRegistrarAlumno from "../../components/Coordinador/CabeceraRegistrarAlumno";


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


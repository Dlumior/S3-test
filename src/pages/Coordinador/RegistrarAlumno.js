import React from "react";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormularioRegistrarAlumno";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";


const titulo = "Registrar Alumno";
const RegistrarAlumno = () => {
  return (
    <div>
      <NombrePrincipal titulo={titulo} />
      <FormularioRegistrarAlumno />
    </div>
  );
};

export default RegistrarAlumno;


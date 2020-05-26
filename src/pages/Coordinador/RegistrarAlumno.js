import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormularioRegistrarAlumno";


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


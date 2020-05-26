import React from "react";
import FormularioRegistrarAlumno from "../../components/Coordinador/FormularioRegistrarAlumno";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";

const titulo = "Procesos de Tutoría";
const Tutorias = () => {
  return (
    <div>
      <NombrePrincipal titulo={titulo} />
      <TabProceso/>
    </div>
  );
};

export default Tutorias;


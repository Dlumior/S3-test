import React, { useEffect, useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import ComboBoxPrograma from "../../components/Coordinador/FormRegistroTutor/comboBoxProgramas";
import { GET } from "../../Conexion/Controller";
import parsearTutores from "../../components/Coordinador/RegistrarDisponibilidad/parsearTutores";

const RegistrarDisponibilidad = () => {
  const idCoordinador = "202";
  const [programas, setProgramas] = useState([]);
  const [programa, setPrograma] = useState(-1);
  const [tutores, setTutores] = useState([]);

  //Funcion auxiliar para obtener el coordinador y sus programas
  useEffect(() => {
    async function fetchProgramas() {
      const endpoint = "/api/coordinador/" + idCoordinador;
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log(res.coordinador.PROGRAMAs);
      setProgramas(res.coordinador.PROGRAMAs);
    }
    fetchProgramas();
  }, [idCoordinador]);

  //FUncion para obtener a los tutores de un programa
  useEffect(() => {
    async function fetchTutores() {
      const endpoint = "/api/tutor/lista/" + programa;
      const params = { servicio: endpoint };
      const res = await GET(params);
      const auxTutores = parsearTutores(res.tutores);
      console.log(auxTutores);

      //setTutores(res.tutores);
    }
    if (programa !== -1) {
      fetchTutores();
    }
  }, [programa]);

  return (
    <>
      <NombrePrincipal titulo="Registrar disponibilidad" />
      <ComboBoxPrograma
        programas={programas}
        programa={programa}
        setPrograma={setPrograma}
      />
    </>
  );
};

export default RegistrarDisponibilidad;

import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmReporte from "../../components/Coordinador/Reporte/FrmReporte";
import TabProceso from "../../components/Coordinador/Tutorias/TabProceso";
import FrmReporteMotivos from "../../components/Coordinador/Reporte/FrmReporteMotivos";
import FrmReporteTutores from "../../components/Coordinador/Reporte/FrmReporteTutores";
import FrmReporteSesiones from "../../components/Coordinador/Reporte/FrmReporteSesiones";

let procesos = [
  { index: 0, titulo: "Encuestas", proceso: () => <FrmReporte /> },
  {
    index: 1,
    titulo: "Motivos de solicitud",
    proceso: () => <FrmReporteMotivos />,
  },
  { index: 2, titulo: "Tutores", proceso: () => <FrmReporteTutores /> },
  { index: 3, titulo: "Sesiones", proceso: () => <FrmReporteSesiones /> },
];

const Reporte = () => {
  return (
    <div>
      {/* <NombrePrincipal titulo="Reporte" />   
      <FrmReporte/>   
    
            <div> */}
      <NombrePrincipal titulo={"Reportes"} />
      {/*Aca vendria a mostrar las citas de este alumno...   */}
      <TabProceso procesos={procesos} />
    </div>

    // </div>
  );
};

export default Reporte;

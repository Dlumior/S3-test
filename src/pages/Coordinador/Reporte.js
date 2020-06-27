import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmReporte from "../../components/Coordinador/Reporte/FrmReporte";

const Reporte = () => {
  return (
    <div>
      <NombrePrincipal titulo="Reporte" />   
      <FrmReporte/>   
    </div>
  );
};

export default Reporte;

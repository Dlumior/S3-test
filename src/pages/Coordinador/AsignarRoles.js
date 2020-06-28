import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmAsignarRoles from "../../components/Coordinador/FrmAsignarRoles/FrmAsignarRoles";

const AsignarRoles = () => {
  return (
    <div>
      <NombrePrincipal titulo="Asignación de Roles" />
      <FrmAsignarRoles/>
    </div>
  );
};

export default AsignarRoles;

import React from "react";
import { Button } from "@material-ui/core";
import RegistroResultados from "./RegistroResultados";

const ParseGrupoAlumno = (data) => {
  if (
    data.ALUMNOs === [] ||
    data.ALUMNOs === null ||
    data.ALUMNOs === undefined
  ) {
    return {
      columns: [
        {
          title: "Nombre",
          field: "nombre",
        },
        { title: "Apellidos", field: "apellidos" },
        { title: "Resultado", field: "btnResultado" },
      ],
      data: [],
    };
  }
  const aux = data.ALUMNOs.map((item) => {
    return {
      nombre: item.USUARIO.NOMBRE,
      apellidos: item.USUARIO.APELLIDOS,
      btnResultado: (
        // <Button variant="outlined" color="primary">
        //   Resultados
        // </Button>
        <RegistroResultados cita={data} user={item} />
      ),
    };
  });

  return {
    columns: [
      {
        title: "Nombre",
        field: "nombre",
      },
      { title: "Apellido", field: "apellidos" },
      { title: "Resultado", field: "btnResultado" },
    ],
    data: aux,
  };
};

export default ParseGrupoAlumno;

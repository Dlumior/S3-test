import React from "react";

import FormModificar from "./FormModificar";
import BtnEliminarTutor from "./BtnEliminarTutor";

const ParseTutors = (data, facultad, programa) => {
  if (data === [] || data === null || data === undefined) {
    return {
      columns: [
        {
          title: "Código",
          field: "codigo",
        },
        {
          title: "Nombre",
          field: "nombre",
        },
        { title: "Correo Electrónico", field: "correo" },
        { title: "Modificar Tutor", field: "modificar" },
        { title: "Eliminar Tutor", field: "eliminar" },
      ],
      data: [],
    };
  }
  const aux = data.map((item) => {
    return {
      id: item.USUARIO.ID_USUARIO,
      codigo: item.USUARIO.CODIGO,
      nombre: item.USUARIO.NOMBRE + " " + item.USUARIO.APELLIDOS,
      correo: item.USUARIO.CORREO,
      modificar: (
        <FormModificar
          datos={item.USUARIO}
          facultad={facultad}
          programa={programa}
        />
      ),
      eliminar: <BtnEliminarTutor datos={item.USUARIO} />,
    };
  });

  return {
    columns: [
      {
        title: "Código",
        field: "codigo",
      },
      {
        title: "Nombre",
        field: "nombre",
      },
      { title: "Correo Electrónico", field: "correo" },
      { title: "Modificar Tutor", field: "modificar" },
      { title: "Eliminar Tutor", field: "eliminar" },
    ],
    data: aux,
  };
};

export default ParseTutors;

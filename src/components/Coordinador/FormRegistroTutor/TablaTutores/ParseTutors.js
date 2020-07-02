import React from "react";

const ParseTutors = (data, facultad) => {
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
      ],
      data: [],
    };
  }
  const aux = data.map((item) => ({
    id: item.USUARIO.ID_USUARIO,
    codigo: item.USUARIO.CODIGO,
    nombre: item.USUARIO.NOMBRE + " " + item.USUARIO.APELLIDOS,
    correo: item.USUARIO.CORREO,
  }));

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
    ],
    data: aux,
  };
};

export default ParseTutors;

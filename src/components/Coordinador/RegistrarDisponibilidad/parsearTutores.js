import React from "react";

import DialogoCalendario from "./DialogoCalendario.js";

const parsearTutores = (data) => {
  const aux = data.map((item) => ({
    id: item.USUARIO.ID_USUARIO,
    codigo: item.USUARIO.CODIGO,
    nombre: item.USUARIO.NOMBRE + " " + item.USUARIO.APELLIDOS,
    correo: item.USUARIO.CORREO,
    calendar: (
      <>
        <DialogoCalendario
          ID={item.USUARIO.ID_USUARIO}
          titulo={item.USUARIO.NOMBRE}
        />
      </>
    ),
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
      { title: "", field: "calendar" },
    ],
    data: aux,
  };
};

export default parsearTutores;

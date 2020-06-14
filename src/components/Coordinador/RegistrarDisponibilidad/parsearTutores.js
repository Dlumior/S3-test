const parsearTutores = (data) => {
  return data.map((item) => ({
    id: item.USUARIO.ID_USUARIO,
    codigo: item.USUARIO.CODIGO,
    nombre: item.USUARIO.NOMBRE + " " + item.USUARIO.APELLIDOS,
    correo: item.USUARIO.CORREO,
  }));
};

export default parsearTutores;

const validateName = (auxName) => {
  const resEspecials = auxName.match(/[A-Za-záéíóúñ0-9 ]+/i);
  const resNumeric = auxName.match(/[0-9]/);

  if (auxName.length >= 100) {
    return {
      error: true,
      mesage: "El nombre debe tener menos de 100 caracteres",
    };
  } else if (
    resEspecials !== null &&
    resEspecials[0].length !== auxName.length
  ) {
    return {
      error: true,
      mesage: "Nombre inválido, contiene caracteres especiales",
    };
  } else if (resNumeric !== null && resNumeric !== 0) {
    return {
      error: true,
      mesage: "Nombre inválido, debe ser una cadena alfabética",
    };
  } else {
    return { error: false, mesage: "" };
  }
};

export default validateName;

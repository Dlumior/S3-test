const validateLastNames = (auxLastNames) => {
  const resEspecials = auxLastNames.match(/[A-Za-záéíóúñ0-9 ]+/i);
  const resNumeric = auxLastNames.match(/[0-9]/);

  if (auxLastNames.length >= 100) {
    return {
      error: true,
      mesage: "El nombre debe tener menos de 100 caracteres",
    };
  } else if (
    resEspecials !== null &&
    resEspecials[0].length !== auxLastNames.length
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

export default validateLastNames;

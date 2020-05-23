const validateCode = (auxCode) => {
  const resEspecials = auxCode.match(/[A-Za-z0-9]+/i);

  if (auxCode.length >= 12) {
    return {
      error: true,
      mesage: "El código debe tener menos de 12 caracteres",
    };
  } else if (
    resEspecials !== null &&
    resEspecials[0].length !== auxCode.length
  ) {
    return {
      error: true,
      mesage: "Código inválido, debe ser una cadena alfanumérica",
    };
  } else {
    return { error: false, mesage: "" };
  }
};

export default validateCode;

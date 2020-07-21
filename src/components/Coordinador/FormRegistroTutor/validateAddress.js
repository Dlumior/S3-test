const validateAddress = (auxAddress) => {
  const resEspecials = auxAddress.match(/[A-Za-záéíóúñ0-9 ()-,.]+/i);

  if (auxAddress.length >= 100) {
    return {
      error: true,
      mesage: "La dirección debe tener menos de 100 caracteres",
    };
  } else if (
    resEspecials !== null &&
    resEspecials[0].length !== auxAddress.length
  ) {
    return {
      error: true,
      mesage: "La dirección contiene caracteres inválidos",
    };
  } else {
    return { error: false, mesage: "" };
  }
};

export default validateAddress;

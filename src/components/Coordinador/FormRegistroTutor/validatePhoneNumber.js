const validatePhoneNumber = (auxPhone) => {
  const resPhone = auxPhone.match(/[0-9 ()+-]+/);
  const resAlphabetic = auxPhone.match(/[A-Za-záéíóúñ]+/i);

  if (auxPhone.length >= 45) {
    return {
      error: true,
      mesage: "El teléfono debe tener menos de 45 caracteres",
    };
  } else if (resPhone !== null && resPhone[0].length !== auxPhone.length) {
    return {
      error: true,
      mesage: "Telefono invalido, ingrese de nuevo",
    };
  } else if (resAlphabetic !== null && resAlphabetic !== 0) {
    return {
      error: true,
      mesage: "Telefono invalido, ingrese de nuevo",
    };
  } else {
    return { error: false, mesage: "" };
  }
};

export default validatePhoneNumber;

const validateEmail = (auxEmail) => {
  const resEspecials = auxEmail.match(/[A-Za-z0-9._@]+/i);

  function validateemail(email) {
    var re = /^[a-z0-9](\.?[a-z0-9]){5,}@pucp(\.edu)?\.pe$/;
    return re.test(String(email).toLowerCase());
  }

  if (auxEmail.length >= 100) {
    return {
      error: true,
      mesage: "El correo debe tener menos de 100 caracteres",
    };
  } else if (
    resEspecials !== null &&
    resEspecials[0].length !== auxEmail.length
  ) {
    return {
      error: true,
      mesage: "Correo inválido, ingrese de nuevo",
    };
  } else if (!validateemail(auxEmail)) {
    return {
      error: true,
      mesage: "Correo inválido, ingrese de nuevo",
    };
  } else {
    return { error: false, mesage: "" };
  }
};

export default validateEmail;

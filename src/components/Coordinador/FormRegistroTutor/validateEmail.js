const validateEmail = (auxEmail, dominio1, dominio2) => {
  const resEspecials = auxEmail.match(/[A-Za-z0-9._@]+/i);

  function validateemail(email, dominio1, dominio2) {
    return !( (dominio1.length > 0 && email.substr(-dominio1.length)!==dominio1) && (dominio2.length > 0 && email.substr(-dominio2.length)!==dominio2) );
  }

  if (!dominio1 && !dominio2) {
    return {
      error: true,
      mesage: "Primero debe registrar algún dominio para los correos de la institución.",
    };
  } else if (auxEmail.length >= 100) {
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
  } else if (!validateemail(auxEmail, dominio1, dominio2)) {
    return {
      error: true,
      mesage: "El correo debe pertenecer al dominio de la institución: " + (dominio1?(dominio1.length>0?dominio1:""):"") + " " + (dominio2?(dominio2.length>0? dominio2:""):""),
    };
  } else {
    return { error: false, mesage: "" };
  }
};

export default validateEmail;

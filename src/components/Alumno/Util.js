export const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  
];
export const mesesAnio = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abri",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Nombiembre",
  "Diciembre",
];
export const NdiasMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/**
 *
 * @param {Date} fecha fecha que sera parseada
 * @returns {string} la fecha en formato "YY-MM-DD"
 */
export const fechaEstandar = (fecha) => {
    const fechaLocal = new Date(fecha);
  return (
    fechaLocal.getFullYear() +
    "-" +
    (fechaLocal.getUTCMonth() + 1) +
    "-" +
    fechaLocal.getUTCDate()
  );
};

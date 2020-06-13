export const estadoInicial = {
    usuario: {
        nombre: "",
        apellido: "",
        foto: "",
        email: "",
    },
    auth: false
}
const sesionReducer = (state = estadoInicial, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, usuario: action.sesion, auth: action.auth };
    case "CHANGE_SESION":
      return { ...state, usuario: action.nuevoUsuario, auth: action.auth };
    case "FINISH_SESION":
      return { ...state, usuario: action.nuevoUsuario, auth: action.auth };
    default:
      return state;
  }
};
export default sesionReducer;

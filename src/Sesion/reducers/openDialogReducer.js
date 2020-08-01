export const estadoInicial = {
    open:false,
    mensaje:""
  };
const openDialogReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case "OPEN_DIALOG":
          return {
            ...state,
            openMensaje: action.openMensaje.open,
            mensaje: action.openMensaje.mensaje,
          };
        default:
          return state;
      }
}
export default openDialogReducer;
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
            postClose: action.openMensaje.postClose,
          };
        default:
          return state;
      } 
}
export default openDialogReducer;
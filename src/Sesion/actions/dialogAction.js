export const openMensajePantalla = (dispatchDialog, openMensaje) => {
    console.log("OPEEEEEN", openMensaje);
    dispatchDialog({
        type: "OPEN_DIALOG",
        openMensaje:openMensaje
    });
}
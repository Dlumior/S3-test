import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { GET, POST } from "../../../../Conexion/Controller";

export default function BtnEliminarTutor(props) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(
    "¿Desea eliminar al tutor " + props.datos.NOMBRE + "?"
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEliminar = () => {
    async function eliminarTutor() {
      const endpoint = "/api/tutor/eliminar/" + props.datos.ID_USUARIO;
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      console.log(res);
      if (res) {
        if (res.status) {
          setMsg("El tutor fue eliminado correctamente");
          await setTimeout(async () => {
            handleClose();
          }, 1500);
          window.location.reload();
        } else if (res.message) {
          setMsg(res.message);
          await setTimeout(async () => {
            handleClose();
          }, 2500);
        }
      } else {
        setMsg("Algo salió mal, intente otra vez más tarde");
        await setTimeout(async () => {
          handleClose();
        }, 3000);
      }
    }
    eliminarTutor();
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <DeleteIcon style={{ color: "red" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar tutor</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEliminar} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

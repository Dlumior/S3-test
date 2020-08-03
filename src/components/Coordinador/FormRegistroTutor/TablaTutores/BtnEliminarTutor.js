import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

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

  const handleEliminar = () => {};

  return (
    <div>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <DeleteIcon style={{ backgroundColor: "red" }} />
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

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormRegistroTutor from "./FormRegistroTutor";

export default function BtnRegistroTutor(props) {
  const { datos, setDatos } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Registrar tutor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Registro de tutor</DialogTitle>
        <DialogContent>
          <FormRegistroTutor
            datos={datos}
            setDatos={setDatos}
            handleClose={handleClose}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Guardar
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

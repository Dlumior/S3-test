import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EventsCalendar from "./CalendarioPopup/EventsCalendar";

export default function DialogoCalendario(props) {
  const [open, setOpen] = React.useState(false);
  const auxTutor = {
    ID_USUARIO: props.ID,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver disponibilidad
      </Button>
      <Dialog style={{margin: `0 auto`}}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth
      >
        <DialogTitle id="form-dialog-title">
          Disponibilidad de {props.titulo}
        </DialogTitle>
        <DialogContent>
          <EventsCalendar Tutor={auxTutor} facultad = {props.facultad}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

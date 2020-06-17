import React from "react";
import { Paper, TextField, Grid, Button, makeStyles } from "@material-ui/core";
import { getUser } from "../../Sesion/Sesion";

const useStyles = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(5),
    width: theme.spacing(150),
    height: theme.spacing(35),
  },
}));

const Datos = (props) => {
  const classes = useStyles();

  const { isEdit } = props;
  // const isEdit = true;

  return (
    <Paper className={classes.caja}>
      <Grid container xs={12} direction="column" spacing={2}>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Codigo"
              type="text"
              fullWidth
              defaultValue={props.codigo}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Correo"
              type="email"
              fullWidth
              defaultValue={props.correo}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={10}>
          <Grid item xs={6}>
            <TextField
              disabled={!isEdit}
              margin="dense"
              id="name"
              label="Dirección"
              type="text"
              fullWidth
              defaultValue={props.direccion}
              inputRef={props.refs.dir}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={!isEdit}
              margin="dense"
              id="name"
              label="Teléfono"
              type="text"
              fullWidth
              defaultValue={props.telefono}
              inputRef={props.refs.tel}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="flex-start" alignItems="center">
          {isEdit && (
            <Button
              color="primary"
              variant="contained"
              onClick={props.handleGuardar}
            >
              Guardar
            </Button>
          )}
          {!isEdit && (
            <Button
              color="primary"
              variant="outlined"
              onClick={props.handleEdit}
            >
              Editar
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Datos;

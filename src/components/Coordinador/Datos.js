import React from "react";
import { Paper, TextField, Grid, Button, makeStyles } from "@material-ui/core";
import { getUser } from "../../Sesion/Sesion";

const useStyles = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(5),
    width: theme.spacing(150),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
  },
}));

const Datos = (props) => {
  const classes = useStyles();

  const { isEdit } = props;

  return (
    <Paper className={classes.caja}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item md={6} xs={12}>
          {/*console.log("cod::",props.codigo)*/}
          <TextField
            disabled
            margin="dense"
            id="name"
            label="Codigo"
            type="text"
            fullWidth
            value={props.codigo}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            margin="dense"
            id="name"
            label="Correo"
            type="email"
            fullWidth
            value={props.correo}
          />
        </Grid>
        <Grid item md={6} xs={12}>
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
        <Grid item md={6} xs={12}>
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
        <Grid item container justify="flex-end" alignItems="center">
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

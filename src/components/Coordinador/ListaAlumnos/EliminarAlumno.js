import React, { Component, useEffect, useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";

import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { getUser } from "../../../Sesion/Sesion";

const EliminarAlumno = (props) => {
  const { open, close, id, parentCallback } = props;
  const [flag, setFlag] = useState(0); //actualizar lista facu
  const [elimino, setElimino] = useState(false);
  const [alerta, setAlerta] = useState({
    mensaje: "¿Está seguro de eliminar el alumno?",
  });

  const handleClick = async (e) => {
    //FACULTAD ELIMINAR
    //console.log("idFacu",id);
    let enlace;
    enlace = "/api/alumno/eliminar/" + id;
    const props = { servicio: enlace , request:{}};
    let resultado = await Conexion.POST(props);
    //console.log("got updated coord from back:", resultado);
    if (resultado) {
      if (resultado.status !== "success") {
        setElimino(false);
        //console.log("elimino",elimino);
        setAlerta({
          mensaje:
            "El alumno no puede eliminarse porque cuenta con sesiones pendientes",
        });
      } else {
        setElimino(true);
        setAlerta({
          mensaje: "",
        });
      }
    }
    //actualizamos lista
    const newValue = flag + 1;
    setFlag(newValue);
    await parentCallback(newValue);
    //console.log("elimino",elimino);
  };

  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Grid container md={12} justify="center">
            {!elimino && (
              <CancelRoundedIcon color="error" style={{ fontSize: 70 }} />
            )}
            {elimino && (
              <CheckCircleRoundedIcon
                color="primary"
                style={{ fontSize: 70 }}
              />
            )}
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container md={12} justify="center">
            {/*console.log("alerta",alerta.mensaje)*/}
            {!elimino && (
              <Typography variant="subtitle1">{alerta.mensaje}</Typography>
            )}
            {elimino && (
              <Typography variant="subtitle1">
                El alumno se eliminó satisfactoriamente
              </Typography>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <div style={{ display: elimino ? "none" : "block" }}>
            <Button variant="outlined" onClick={close} color="inherit">
              Cancelar
            </Button>
          </div>

          <Button
            variant="contained"
            onClick={!elimino ? (e) => handleClick(e) : close}
            color="primary"
          >
            {!elimino && "Eliminar"}
            {elimino && "Aceptar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EliminarAlumno;

import React, { Component, useEffect,useState } from "react";
import * as Conexion from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";  
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import {getUser} from "../../../Sesion/Sesion";

const EliminarAsignacion = (props) => {
  const {open,close,id,parentCallback}=props;
  const [flag, setFlag] = useState(0);//actualizar lista facu
  const [elimino, setElimino] = useState(false);
  const [alerta, setAlerta]=useState({
    mensaje: "¿Está seguro de eliminar la asignación?",
  });
 

  const handleClick = async (e) => {    
            //ASIGNACION ELIMINAR 
      //console.log("id",id);
      const props = { servicio: "/api/asignacion/eliminar/"+id };
      let resultado = await Conexion.POST(props);
      //console.log("got updated coord from back:", resultado);
      if (resultado){
        if (resultado.resultado!=="success"){
          setElimino(false);
          //console.log("elimino",elimino);    
          setAlerta({
            mensaje:"La asignación no puede eliminarse porque cuenta sesiones pendientes",
          }); 
        }else{          
          setElimino(true);
          setAlerta({
            mensaje:"",
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
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container md={12} justify="center">
              {!elimino && <CancelRoundedIcon color="error" style={{ fontSize: 70 }}/>}
              {elimino && <CheckCircleRoundedIcon color="primary" style={{ fontSize: 70 }}/>}
          </Grid>
        </DialogTitle>
        <DialogContent>
            <Grid container md={12} justify="center">
              {/*console.log("alerta",alerta.mensaje)*/}
              {!elimino && 
                <Typography variant="subtitle1" >
                  {alerta.mensaje}
               </Typography>}
            {elimino &&
              <Typography variant="subtitle1" >
                La asignación se elimino satisfactoriamente
            </Typography>}
            </Grid>
        </DialogContent>       
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={close} color="inherit">
            Cancelar
          </Button>

          <Button 
            variant="contained"
            onClick={!elimino? (e) => handleClick(e): close}
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
export default EliminarAsignacion;
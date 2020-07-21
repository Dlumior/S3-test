import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  Button  from '@material-ui/core/Button';
import * as Conexion from "../../../Conexion/Controller";

class Confirmacion extends Component{
    constructor(props){
        super(props);
        
    }
   
    
    handleClose = e => { 
        this.props.cerrarConfirmacion()        
    }; 

    eliminarDisponibiliad = async () => {
      this.props.empezarCarga();    
      this.props.closeDialog();
      const props = { servicio: "/api/disponibilidad/eliminar/" + this.props.datos.idDisponibilidad, request: {} };      
      let nuevo = await Conexion.POST(props);
      if(nuevo){
        if(!nuevo.hasOwnProperty('error')){
          //console.log("DISP", this.props.datos.idDisponibilidad)
          //console.log("Respuesta", nuevo);  
          this.props.actualizarBandera(); 
          this.props.actualizarMensaje();
        }
      }
    }
      
    render(){
        return (
            <div>
              <Dialog
                open={this.props.datos.abrirConfirmacion}
                onClose={(e) => this.handleClose(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"¿Seguro que desea eliminar esta disponibilidad?"}</DialogTitle>
                <DialogActions>
                  <Button onClick={(e) => this.eliminarDisponibiliad(e)} color="primary" variant = "contained">
                    Si
                  </Button>
                  <Button onClick={(e) => this.handleClose(e)} color="primary" variant = "outlined">
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
    
}

export default Confirmacion;
  
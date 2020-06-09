import React, { Component } from 'react';
import { MenuItem, Select, Grid, FormControl, InputLabel, FormHelperText, IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Conexion from "../../../Conexion/Controller";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alertas from '../../Coordinador/Alertas';
import Confirmacion from './Confirmacion';
      
 const style = { 
  icono:{
    align: "right",
    marginTop: "9px"
  },

  dialog:{
    width: 475,
    margin: "0 auto",
  }
 }


  class Dialogo extends Component {
    constructor(props){
      super(props);
      this.state = {
        repeticion: 1,
        horaInicio: (this.props.datos.horaInicio)>"08:00"?(this.props.datos.horaInicio):"08:00",
        horaFin: (this.props.datos.horaFin)>"08:30"?(this.props.datos.horaFin):"08:30",
        lugar: "",
        idDisponibilidad: this.props.datos.idDisponibilidad,        
        mensajeEliminar: "Disponibilidad eliminada exitosamente",
        mensajeModificar: "Disponibilidad modificada exitosamente",
        mensajeRegistrar: "Disponibilidad registrada exitosamente",
        abrirConfirmacion: false,
        errorLugar: false,
        alerta:{
          mensaje: "",
          mostrar: false
        }        
      }
    }

    cerrarConfirmacion = () => {
      this.setState({abrirConfirmacion: false})
    }

    handleClose = e => { 
      this.props.closeDialog()        
    };  
    
    handleOnChangeCombo = e =>{
      this.state.repeticion = e.target.value
    }

    handleOnChangeLugar = e =>{  
      this.setState({lugar:e.target.value})
      if(e.target.value.length > 100){
        this.setState({errorLugar: true});
      }
      else{
        this.setState({errorLugar: false});
      }
    }

    handleFocusOutHoraIni = async e =>{ 
      if(e.target.value.substring(0,2) < "08"){          
        await this.setState({horaInicio:"08:"+e.target.value.substring(3,5)});     
        document.getElementById("horaInicio").value = this.state.horaInicio;     
      }
      if(e.target.value.substring(3,5) == "30" || e.target.value.substring(3,5) == "00"){          
           
      } 
      else{        
        await this.setState({horaInicio:e.target.value.substring(0,2)+":00"});     
        document.getElementById("horaInicio").value = this.state.horaInicio;  
      }
      console.log("inicio: ", this.state.horaInicio)             
    }

    handleOnChangeHoraIni = async e =>{     
      this.setState({horaInicio:e.target.value});
      document.getElementById("horaInicio").addEventListener("focusout", this.handleFocusOutHoraIni)            
    }

    handleFocusOutHoraFin = async e =>{
      if(e.target.value.substring(0,2) < "08" || e.target.value.substring(0,2) > "20"){          
        await this.setState({horaFin:"08:"+e.target.value.substring(3,5)});     
        document.getElementById("horaFin").value = this.state.horaFin;     
      }
      if(e.target.value.substring(0,2) == "08"){
        if(e.target.value.substring(3,5) == "00"){
          await this.setState({horaFin:e.target.value.substring(0,2)+":30"});     
          document.getElementById("horaFin").value = this.state.horaFin; 
        }
      }
      if(e.target.value.substring(0,2) == "20"){
        if(e.target.value.substring(3,5) == "30"){
          await this.setState({horaFin:e.target.value.substring(0,2)+":00"});     
          document.getElementById("horaFin").value = this.state.horaFin; 
        }
      }
      if(e.target.value.substring(3,5) == "30" || e.target.value.substring(3,5) == "00"){} 
      else{        
        await this.setState({horaFin:e.target.value.substring(0,2)+":00"});     
        document.getElementById("horaFin").value = this.state.horaFin;  
      }
      console.log("fin: ", this.state.horaFin)             
    }

    handleOnChangeHoraFin = e =>{  
      this.setState({horaFin:e.target.value})
      document.getElementById("horaFin").addEventListener("focusout", this.handleFocusOutHoraFin)
    }

    handleEdit = () =>{  
      this.props.activarVisibilidad()
    }

    handleDelete = async () =>{  
      this.setState({abrirConfirmacion:true})      
    }

    handleSave = async e => { 
      if (this.state.horaInicio < this.state.horaFin){
        if(!this.state.errorLugar){
          let horaInicio = this.state.horaInicio;
          let horaFin = this.state.horaFin;
          let repeticion = this.state.repeticion;
          let lugar = this.state.lugar; 
          let fecha = this.props.datos.fecha 
          if(!this.props.datos.modificar){ // registro de nueva disponibilidad
            const nuevaDisponibilidad = {
              disponibilidad : {
                HORA_INICIO: horaInicio,
                HORA_FIN: horaFin,
                FECHA: fecha,
                ID_TUTOR: 51,
                REPETICION: repeticion,
                LUGAR: lugar
              }
            } 
            
            const props = { servicio: "/api/disponibilidad", request: nuevaDisponibilidad };      
            let nuevo = await Conexion.POST(props); 
            this.props.actualizarMensaje(this.state.mensajeRegistrar);         
          } else{ // actualizar disponibilidad
            let id = this.props.datos.idDisponibilidad
            const disponibilidadModificada = {
              disponibilidad : {
                ID_DISPONIBILIDAD: id,
                HORA_INICIO: horaInicio,
                HORA_FIN: horaFin,
                FECHA: fecha,
                ID_TUTOR: 51,
                REPETICION: repeticion,
                LUGAR: lugar
              }
            }
            const props = { servicio: "/api/disponibilidad/modificar", request: disponibilidadModificada };      
            let nuevo = await Conexion.POST(props); 
            this.props.actualizarMensaje(this.state.mensajeModificar);
          } 
          this.props.actualizarBandera();     
          this.props.closeDialog();
          this.props.empezarCarga();
        }else{
          let alerta = {...this.state.alerta};
          alerta.mostrar = true
          alerta.mensaje = "El campo lugar no puede tener más de 100 caracteres"
          this.setState({alerta});
        }
      }else{
        if(!this.state.errorLugar){
          let alerta = {...this.state.alerta};
          alerta.mensaje = "La hora de fin debe de ser mayor que la hora de inicio"
          alerta.mostrar = true          
          this.setState({alerta});
        }else{
          let alerta = {...this.state.alerta};
          alerta.mensaje = "Existen errores al completar el formulario"
          alerta.mostrar = true          
          this.setState({alerta});
        }
      }
                  
    }; 

    renderConfirmacion = () => {
      if (!this.state.abrirConfirmacion) return;
      return(
        <div>
          <Confirmacion datos = {this.state} cerrarConfirmacion = {this.cerrarConfirmacion} 
          actualizarBandera = {this.props.actualizarBandera} closeDialog = {this.props.closeDialog}
          actualizarMensaje = {() => this.props.actualizarMensaje(this.state.mensajeEliminar)} />
        </div>
      );    
    }

    render(){      
      return (        
        <div>          
          <Dialog style = {style.dialog} open={this.props.datos.modalIsOpen} onClose={(e) => this.handleClose(e)} aria-labelledby="form-dialog-title">
          { this.state.alerta.mostrar && <Alertas severity={"error"} titulo={"Observacion"} alerta={this.state.alerta} />}
          <form id= "formulario" noValidate = {false}>
          <Grid container spacing = {0.01} >            
              <Grid item md={9} xs={9}>
                <DialogTitle id="form-dialog-title">{this.props.datos.fechaMostrar} </DialogTitle>
              </Grid>
              <Grid item md={3} xs={3}>
                {/* <div style={style.icono} display= {this.props.datos.modificar}> */}
                <IconButton  title = "Editar" align = "right" style={style.icono} onClick={this.handleEdit} disabled= {!this.props.datos.modificar}>
                  <EditIcon  color = {this.props.datos.modificar?"primary":"disabled"} /> 
                </IconButton>
                <IconButton title = "Eliminar" align = "right" style={style.icono} onClick={this.handleDelete} disabled= {!this.props.datos.modificar}>
                  <DeleteIcon  color = {this.props.datos.modificar?"error":"disabled"} />
                </IconButton>
                {/* </div> */}
              </Grid>
          </Grid>            
            <DialogContent>            
            <Grid container spacing = {1} >
              <Grid item md={6} xs={6}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true}}
                  required
                  margin="dense"
                  id="horaInicio"
                  label="Hora Inicio"
                  inputProps = {{step: 1800, min : "08:00", max: "19:30" }}  
                  type="time"                  
                  defaultValue = {(this.props.datos.horaInicio)>"08:00"?(this.props.datos.horaInicio):"08:00"}
                  onChange={this.handleOnChangeHoraIni}
                  disabled={!this.props.datos.visible}                  
                />                 
                <FormHelperText >
                  {"Valor entre 08:00 y 19:30"}
                </FormHelperText>
              </Grid>
              <Grid item md={6} xs={6}>                            
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true}}
                  required
                  margin="dense"
                  id="horaFin"
                  label="Hora Fin"
                  type="time"
                  inputProps = {{step: 1800, min : "08:30", max: "20:00" }}  
                  defaultValue = {(this.props.datos.horaFin>"08:30"?(this.props.datos.horaFin):"08:30")}
                  onChange={this.handleOnChangeHoraFin}
                  disabled={!this.props.datos.visible}
                />    
                <FormHelperText >
                  {"Valor entre 08:30 y 20:00"}
                </FormHelperText>                      
              </Grid>              
              <Grid item md={12} xs={12}>
                <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-placeholder-label-label">
          {"Repeticion"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          defaultValue={this.props.datos.repeticion}
          onChange={this.handleOnChangeCombo}
          disabled={!this.props.datos.visible}
        >
          <MenuItem value={1}> No repetir</MenuItem>
          <MenuItem value={2}> Todos los dias</MenuItem>
          <MenuItem value={3}> Todas las semanas</MenuItem>
        </Select>
        <FormHelperText>Escoja la opcion</FormHelperText>
      </FormControl>
      <Grid item md={12} xs={12}>
        <TextField
          fullWidth
          name="lugar"
          label="Lugar"
          className = "editable"
          id="lugar"
          onChange={this.handleOnChangeLugar}
          defaultValue= {this.props.datos.lugar}
          disabled={!this.props.datos.visible}
        />  
        { this.state.errorLugar && <FormHelperText error> El lugar debe ser de máximo 100 caracteres</FormHelperText>}
      </Grid>
        </Grid>
      </Grid>       
      </DialogContent>
        <DialogActions>              
              <Button id = "btnGuardar"  onClick={(e) => this.handleSave(e)}  color="primary" variant="contained" disabled={!this.props.datos.visible}>
                Guardar
              </Button>
              <Button onClick={(e) => this.handleClose(e)} color="primary" variant = "outlined"> 
                Cancelar
              </Button>
        </DialogActions>
        </form>
      </Dialog>
      {this.renderConfirmacion()}
    </div>        
      );
  }
    }  

  export default Dialogo;

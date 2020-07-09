import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, Grid } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaAsistencias from "./TablaAsistencias";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from "@material-ui/core/IconButton";
import { getUser } from "../../../Sesion/Sesion";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import CancelRoundedIcon from '@material-ui/icons/CancelRounded';


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight:"3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    }
  };


class Asistencias extends React.Component {
  constructor(props) {
    super();
    this.state = {
        sesiones: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  }
    };
    //this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);
    this.establecerData = this.establecerData.bind(this);

  }

  establecerData(arregloSesiones){
    let arreglillo = [];
    for (let element of (arregloSesiones.data)){
      if (element.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO===0 ||
          element.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO===1){//las canceladas tienen null
        arreglillo.push({
          tutor:element.TUTOR.USUARIO.NOMBRE + " " + element.TUTOR.USUARIO.APELLIDOS,
          tutoria:element.PROCESO_TUTORIum.NOMBRE,
          fecha:element.FECHA,
          hora:element.HORA_INICIO.length>5? 
          element.HORA_INICIO.slice(0,-3)+"-"+ element.HORA_FIN.slice(0,-3):
          element.HORA_INICIO+"-"+ element.HORA_FIN,
          asistencia:
          <div> 
            {element.ALUMNOs[0].ALUMNO_X_SESION.ASISTENCIA_ALUMNO>0?
            <CheckCircleRoundedIcon color="primary" fontSize="large"/>:
            <CancelRoundedIcon color="error" fontSize="large"/>}
          </div>
          });  

      }
    }
    const data = {
        columns: [
          {
            title: "Tutor",
            field: "tutor",
          },
          {
            title: "Tutoria",
            field: "tutoria",
          },
          {
            title:"Fecha",
            field:"fecha"
           },
           {
            title:"Hora Inicio-Fin",
            field:"hora"
           },
           {
            title:"Asistencia",
            field:"asistencia"
           }
        ],
        data: arreglillo
      };
      this.setState({sesiones:data});

  }
  async componentDidUpdate(prevProps){
    if (this.props.data!==prevProps.data){
      let arregloSesiones;
      const { idAlumno, fullname } = this.props.datosAlumno;
      if (!idAlumno || !fullname) {
        //sino BAIS!
        return;
      } else{
        arregloSesiones=await Controller.GET({servicio:"/api/listaSesionAlumno/"+idAlumno});      
      }    
      console.log("arreglo: ",arregloSesiones);
      this.establecerData(arregloSesiones);
    }    
  }

  async componentDidMount(){
    const { idAlumno, fullname } = this.props.datosAlumno;
    let arregloSesiones;
    if (!idAlumno || !fullname) {
      //sino BAIS!
      return;
    } else{
      arregloSesiones=await Controller.GET({servicio:"/api/listaSesionAlumno/"+idAlumno});      
    }    
    console.log("arreglo: ",arregloSesiones);
    this.establecerData(arregloSesiones);
  }

render(){
    return (
        <div>
            <TablaAsistencias sesiones={this.state.sesiones}  />
        </div>
    );
}

}

export default Asistencias;

const estilo={
imagen:{
    width :"25%"
}
}

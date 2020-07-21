import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, IconButton } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaAsignaciones from "./TablaAsignaciones";
import Button from "@material-ui/core/Button";
import VerAlumnos from "./ModificaAsignaciones";
import ActualizarAsignacion from "./ActualizarAsignacion";

import { getUser } from "../../../Sesion/Sesion";
import moment from 'moment';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EliminarFacultad from "../../Administrador/Facultades/EliminarFacultad";
import EliminarAsignacion from "./EliminarAsignacion";

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


class ListaAsignaciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        asignaciones: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        alumnos:[],
        alumnosSelec:[],
        asignacion:[],
        flag:0,
        idAsignacion:"",
    };
    this.establecerData = this.establecerData.bind(this);    
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnOpenEliminar = this.handleOnOpenEliminar.bind(this);

  }
  establecerData(arregloAsigna){
    
    let arreglillo = [];
    for (let element of arregloAsigna.asignaciones){
      if (element.ID_ASIGNACION!==null){
        arreglillo.push({
          fecha:moment(element.FECHA_ASIGNACION).format("YYYY-MM-DD"),
          tutor:element.TUTOR.USUARIO.NOMBRE+" "+element.TUTOR.USUARIO.APELLIDOS,
          tutoria:element.PROCESO_TUTORIA.NOMBRE,
          boton:<div> 
                    <Button 
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handleOnOpen(element.ALUMNOS)}
                        >
                        Ver alumnos
                    </Button>
                </div>,
          edit:
          <div> 
          <IconButton color="primary">
              <EditRoundedIcon
              color="secondary"
              fontsize="large"
              onClick={() => this.handleOnOpenModificar(element)}
              />
          </IconButton>
          <IconButton color="primary">
              <DeleteRoundedIcon
              color="error"
              fontsize="large" 
              onClick={() => this.handleOnOpenEliminar(element.ID_ASIGNACION)}
              />                    
          </IconButton>
        </div>

          });
            

      }
    }
    const data = {
        columns: [
          {
            title: "Fecha",
            field: "fecha",
          },
          {
            title: "Tutor",
            field: "tutor",
          },
          {
            title: "Tutoria",
            field: "tutoria",
          },
          {
            title:"Alumnos",
            field:"boton"
          },
          {
            title:"",
            field:"edit"
           }
        ],
        data: arreglillo
      };
      this.setState({asignaciones:data});

  }
  async componentDidUpdate(prevProps,nextState){
    if (this.props.idTutoria!==prevProps.idTutoria || nextState.flag !== this.state.flag){
      //console.log("idFacu: ",this.props.idTutoria);
      let arregloAsigna=await Controller.GET({servicio:"/api/asignacion/lista?tutoria="+this.props.idTutoria});
      //console.log("arreglo: ",arregloAsigna);
      if (arregloAsigna){
        this.establecerData(arregloAsigna);
      }

    }
  }
  async componentDidMount(){
    let arregloAsigna=await Controller.GET({servicio:"/api/asignacion/lista?tutoria="+this.props.idTutoria});
    //console.log("arreglo: ",arregloAsigna);
    if (arregloAsigna){
      this.establecerData(arregloAsigna);
    }
    
  
}
handleOnOpen= (alumnos) =>{
  this.setState({ open: true });
  this.state.alumnos=alumnos;
  //console.log("alumnos",this.state.alumnos);
} 
handleOnOpenModificar= (element) =>{
  this.setState({ open2: true });
  this.state.asignacion=element;
  
  if (element.ALUMNOS){
    for (let alu of element.ALUMNOS){//alumnos seleccionados
      this.state.alumnosSelec.push(alu.ID_ALUMNO);
    }
  }  
  //console.log("asignacion",this.state.asignacion);
} 
handleOnOpenEliminar= (idAsignacion) =>{
  this.setState({ open3: true });
  this.state.idAsignacion=idAsignacion;
  //console.log("alumnos",this.state.idAsignacion);
} 
handleOnClose() {
  this.setState({ open: false });
  this.setState({ open2: false });
  this.setState({ open3: false });

}
callback = (count) => {
  // do something with value in parent component, like save to state
  let i= this.state.flag +1;
  //console.log("veamos: ",i);
  this.setState({flag:i});
}

render(){
    return (
        <div>
            {this.state.open && 
            <VerAlumnos 
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              alumnos={this.state.alumnos}
            />}
            {this.state.open2 && 
            <ActualizarAsignacion
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              asignacion={this.state.asignacion}
              idPrograma={this.props.idPrograma}
              alumnos={this.state.alumnosSelec}
              parentCallback={this.callback}
            />}
            {this.state.open3 && 
            <EliminarAsignacion
              open={this.handleOnOpenEliminar} 
              close={this.handleOnClose}
              id={this.state.idAsignacion}
              parentCallback={this.callback}
            />}
            <Paper elevation={0} style={style.paper}>
                <TablaAsignaciones asignaciones={this.state.asignaciones}  />
            </Paper>
        </div>
    );
}

}

export default ListaAsignaciones;

const estilo={
imagen:{
    width :"25%"
}
}

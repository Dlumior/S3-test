import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaAsignaciones from "../../Coordinador/FormAsignacion/TablaAsignaciones";
import ModificaAsignacion from "../../Coordinador/FormAsignacion/ModificaAsignaciones";

import Button from "@material-ui/core/Button";
import { getUser } from "../../../Sesion/Sesion";
import moment from 'moment';


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
        alumnosSeleccionados:[]
    };
    this.establecerData = this.establecerData.bind(this);    
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);

  }
  establecerData(arregloAsigna){
    
    let arreglillo = [];
    for (let element of arregloAsigna.asignaciones){
      if (element.ID_ASIGNACION!==null){
        arreglillo.push({
          fecha:moment(element.FECHA_ASIGNACION).format("YYYY-MM-DD"),
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
          checkbox:
          <div>
            <input                                     
                type="checkbox" 
                id={element.ID_ASIGNACION} 
                name="alumnos" 
                value={element.ALUMNOS}
                onChange={() => this.handleOnChangeChecked(element.ID_ASIGNACION,element.ALUMNOS)}>                                                                           
            </input>
          </div>
          });  

      }
    }
    const data = {
        columns: [
          {
            title: "Fecha de Asignación",
            field: "fecha",
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
             title:"Seleccionar",
             field:"checkbox"
            }
        ],
        data: arreglillo
      };
      this.setState({asignaciones:data});

  }
  async componentDidUpdate(prevProps){
    if (this.props.idTutoria!==prevProps.idTutoria){
      console.log("idFacu: ",this.props.idTutoria);
      let arregloAsigna=await Controller.GET({servicio:"/api/asignacion/tutoria/tutor/"+this.props.idTutoria+"/"+
        getUser().usuario.ID_USUARIO});
        if (arregloAsigna){
            console.log("arreglo: ",arregloAsigna);
            this.establecerData(arregloAsigna);
        }
    }
  }
  async componentDidMount(){
    let arregloAsigna=await Controller.GET({servicio:"/api/asignacion/tutoria/tutor/"+this.props.idTutoria+"/"+
        getUser().usuario.ID_USUARIO});
    if (arregloAsigna){
        console.log("arreglo: ",arregloAsigna);
        this.establecerData(arregloAsigna);
    }
  
}

async handleOnChangeChecked(idAsignacion,alumnosAsignados) {

  const cb = document.getElementById(idAsignacion)
  console.log("event",alumnosAsignados);

  if (this.state.alumnosSeleccionados.length!==0){     
    if (cb.checked===false){
      for (let ele of alumnosAsignados){
        var i = this.state.alumnosSeleccionados.findIndex(v => v === ele.ID_USUARIO)
        console.log("i=",i);
        if ( i !== -1 ) {
          this.state.alumnosSeleccionados.splice(i,1);
        } 
      }     
    }else{
      for (let ele of alumnosAsignados){
        this.state.alumnosSeleccionados.push(ele.ID_ALUMNO);
      }
    }
  }else if (cb.checked===true){
    for (let ele of alumnosAsignados){
      this.state.alumnosSeleccionados.push(ele.ID_ALUMNO);
    }
    
  }
  console.log("listaalumnos",this.state.alumnosSeleccionados);
  await this.props.escogerAlumnos(this.state.alumnosSeleccionados); 
  console.log("listaalumnos",this.state.alumnosSeleccionados);

}

handleOnOpen= (alumnos) =>{
  this.setState({ open: true });
  this.state.alumnos=alumnos;
  console.log("alumnos",this.state.alumnos);
} 
handleOnClose() {
  this.setState({ open: false });
}



render(){
    return (
        <div>
            {this.state.open && 
            <ModificaAsignacion 
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              alumnos={this.state.alumnos}
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

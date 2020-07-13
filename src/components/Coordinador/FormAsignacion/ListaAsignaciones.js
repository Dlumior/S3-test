import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaAsignaciones from "./TablaAsignaciones";
import Button from "@material-ui/core/Button";
import ModificaAsignacion from "./ModificaAsignaciones";
import { getUser } from "../../../Sesion/Sesion";


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
        alumnos:[]
    };
    this.establecerData = this.establecerData.bind(this);    
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }
  establecerData(arregloAsigna){
    
    let arreglillo = [];
    for (let element of arregloAsigna.asignaciones){
      if (element.ID_ASIGNACION!==null){
        arreglillo.push({
          fecha:element.FECHA_ASIGNACION,
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
           }
        ],
        data: arreglillo
      };
      this.setState({asignaciones:data});

  }
  async componentDidUpdate(prevProps){
    if (this.props.idTutoria!==prevProps.idTutoria){
      console.log("idFacu: ",this.props.idTutoria);
      let arregloAsigna=await Controller.GET({servicio:"/api/asignacion/lista?tutoria="+this.props.idTutoria});
    console.log("arreglo: ",arregloAsigna);
    this.establecerData(arregloAsigna);

    }
  }
  async componentDidMount(){
    let arregloAsigna=await Controller.GET({servicio:"/api/asignacion/lista?tutoria="+this.props.idTutoria});
    console.log("arreglo: ",arregloAsigna);
    this.establecerData(arregloAsigna);
  
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

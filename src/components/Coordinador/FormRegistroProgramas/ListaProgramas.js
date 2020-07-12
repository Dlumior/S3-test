import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaProgramas from "./TablaProgramas";
import Button from "@material-ui/core/Button";
import { getUser } from "../../../Sesion/Sesion";
import ModificaPrograma from "./ModificarPrograma";


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


class ListaProgramas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        programas: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        programa:[{id:"1"}],
        programaConCoord:[],
        flag:0,//actualiza modificar y eliminar
    };
    this.establecerData = this.establecerData.bind(this);
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }
  establecerData(arregloProg){
    
    let arreglillo = [];
    for (let element of arregloProg.programa){
      if (element.ID_PROGRAMA!==null){
        arreglillo.push({
          codigo:element.ID_PROGRAMA,
          nombre:element.NOMBRE,
          boton:<div> 
                    <Button 
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handleOnOpen(element)}
                    >
                        Ver Programa
                    </Button>
                </div>
          });  

      }
    }
    const data = {
        columns: [
          {
            title: "Código",
            field: "codigo",
          },
          {
            title: "Nombre",
            field: "nombre",
          },
          {
            title:"",
            field:"boton"
           }
        ],
        data: arreglillo
      };
      this.setState({programas:data});

  }
  async componentDidUpdate(prevProps,nextState){
    if (this.props.idFacu!==prevProps.idFacu //|| this.props.flag!==prevProps.flag 
      || nextState.flag !== this.state.flag){
      console.log("idFacu: ",this.props.idFacu);
      //let arregloProg=await Controller.GET({servicio:"/api/programa"});
      let arregloProg=await Controller.GET({servicio:"/api/programa/lista/"+this.props.idFacu});
      //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
      console.log("arreglo: ",arregloProg);
      this.establecerData(arregloProg);

    }
  }
  async componentDidMount(){
    let idCoord=getUser().usuario.ID_USUARIO;
    console.log("idFacu: ",this.props.idFacu);
    let arregloProg=await Controller.GET({servicio:"/api/programa/coordinador/"+idCoord});
    //let arregloProg=await Controller.GET({servicio:"/api/programa/lista/"+this.props.idFacu});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    console.log("arreglo: ",arregloProg);
    this.establecerData(arregloProg);
  
}

handleOnOpen= (programa) =>{
  this.setState({ open: true });
  console.log("coordinadores del programa",programa);
  this.state.programaConCoord=programa;
} 
handleOnClose() {
  this.setState({ open: false });
  //window.location.reload();
}

callback = (count) => {
  // do something with value in parent component, like save to state
  let i= this.state.flag +1;
  console.log("veamos: ",i);
  this.setState({flag:i});
}


render(){
    return (
        <div>
          {this.state.open && 
            <ModificaPrograma
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              programa={this.state.programaConCoord}
              parentCallback={this.callback}
            />}
            <Paper elevation={0} style={style.paper}>
                <TablaProgramas programas={this.state.programas}  />
            </Paper>
        </div>
    );
}

}

export default ListaProgramas;

const estilo={
imagen:{
    width :"25%"
}
}

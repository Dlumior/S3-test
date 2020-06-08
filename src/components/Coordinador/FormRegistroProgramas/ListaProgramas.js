import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaProgramas from "./TablaProgramas";
import Button from "@material-ui/core/Button";


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    }
  };


class ListaProgramas extends React.Component {
  constructor() {
    super();
    this.state = {
        programas: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        programa:[{id:"1"}]
    };
    //this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);

  }
  async componentDidMount(){
    let arregloProg=await Controller.GET({servicio:"/api/programa/"});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    
    console.log("arreglo: ",arregloProg);

    let arreglillo = [];
    for (let element of arregloProg.programa){
      if (element.ID_PROGRAMA!==null){
        arreglillo.push({
          codigo:element.ID_PROGRAMA,
          nombre:element.NOMBRE,
          boton:<div> 
                      <Button 
                          variant="outlined"
                          color="primary">
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


render(){
    return (
        <div>
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

import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';

import * as Controller from "../../../Conexion/Controller";
import TablaAlumnos from "./TablaAlumnos";

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


class ListaAlumnos extends React.Component {
  constructor() {
    super();
    this.state = {
        alumnos: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        alumnosSeleccionados:[]
    };
    this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);

  }
  

  async componentDidMount(){
    let arregloDeAlumnos=await Controller.GET({servicio:this.props.enlace});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});    
    console.log("arreglo: ",arregloDeAlumnos);

    let arreglillo = [];
    for (let element of arregloDeAlumnos.alumnos){
        arreglillo.push({
                        codigo:element.USUARIO.CODIGO,
                        nombre:element.USUARIO.NOMBRE+ " "+ element.USUARIO.APELLIDOS,
                        correo:element.USUARIO.CORREO,
                        checkbox:
                                  <div>
                                    <input                                       
                                        type="checkbox" 
                                        id={element.ID_USUARIO} 
                                        name="alumnos" 
                                        value={element.ID_USUARIO}
                                        onChange={this.handleOnChangeChecked}>                                                                           
                                    </input>
                                  </div>
                        });  
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
          { title:"Correo Electrónico",
            field:"correo"},
           {
            title:"",
            field:"checkbox"
           }
        ],
        data: arreglillo
      };
      this.setState({alumnos:data});
}


async handleOnChangeChecked(e) {
  let idA=e.target.value;
  console.log("idAlumo",idA);
  
  const cb = document.getElementById(e.target.value)

  if (this.state.alumnosSeleccionados.length!==0){     
    if (cb.checked===false){
      var i = this.state.alumnosSeleccionados.findIndex(v => v === idA)
      console.log("i=",i);
      if ( i !== -1 ) {
        this.state.alumnosSeleccionados.splice(i,1);
      }      
    }else{
      this.state.alumnosSeleccionados.push(idA);
    }
    //this.setState({alumnosSeleccionados:listaSeleccionados});
    //listaSeleccionados=this.state.alumnosSeleccionados;
  }else if (cb.checked===true){
    this.state.alumnosSeleccionados.push(idA);
  }
  console.log("listaalumnos",this.state.alumnosSeleccionados);
  await this.props.escogerAlumnos(this.state.alumnosSeleccionados); 

}

render(){
    return (
        <div>
            <TablaAlumnos 
              alumnos={this.state.alumnos}
            />
        </div>
    );
}

}

export default ListaAlumnos;

const estilo={
imagen:{
    width :"75%"
}
}

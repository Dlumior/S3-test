import React from "react";

import * as Controller from "../../../Conexion/Controller";
import TablaAlumnos from "./TablaAlumnos";
import { Checkbox } from "@material-ui/core";

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
  constructor(props) {
    super(props);
    this.state = {
        alumnos: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        alumnosSeleccionados:[],
        flag:0,
    };
    this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);
    this.establecerData = this.establecerData.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

  }
  async establecerData(arregloDeAlumnos){
    let arreglillo = [];
    
    for (let element of arregloDeAlumnos.alumnos){
      arreglillo.push({
        codigo:element.CODIGO,
        nombre:element.NOMBRE+ " "+ element.APELLIDOS,
        correo:element.CORREO,
        checkbox:
          <div>
            {<Checkbox
                id={element.ID_USUARIO}
                value={element.ID_USUARIO}
                color="primary"
                defaultChecked={this.state.alumnosSeleccionados.findIndex(v => v === element.ID_USUARIO)!==-1}
                onChange={() => this.handleToggle(element.ID_USUARIO)}                   
            />}
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
  async componentDidUpdate(prevProps,nextState){
    if (nextState.flag !== this.state.flag ){
      let arregloDeAlumnos=await Controller.GET({servicio:this.props.enlace});
      if (arregloDeAlumnos){
        console.log("arreglo: ",arregloDeAlumnos);
        this.establecerData(arregloDeAlumnos);
      }
    }    
  }
  async componentDidMount(){
    let arregloDeAlumnos=await Controller.GET({servicio:this.props.enlace});
    if (arregloDeAlumnos){
      console.log("arreglo: ",arregloDeAlumnos);
      this.establecerData(arregloDeAlumnos);
    }
}

async handleToggle(idA){
  var i = this.state.alumnosSeleccionados.findIndex(v => v === idA)
  console.log("indice",i);
  if ( i !== -1 ) {
    this.state.alumnosSeleccionados.splice(i,1);
  }else{
    this.state.alumnosSeleccionados.push(idA);
  }
  let j= this.state.flag +1;
  console.log("veamos: ",j);
  this.setState({flag:j});

  console.log("listaalumnos",this.state.alumnosSeleccionados);
  await this.props.escogerAlumnos(this.state.alumnosSeleccionados); 
};

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
            {<TablaAlumnos 
              alumnos={this.state.alumnos}
            />}
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

import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText } from "@material-ui/core";
import * as Controller from "../../Conexion/Controller";
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
            data:[{nombre:"TySEsMiPastor"}]  },
        alumnosSeleccionados:[{id:"1"}]
    };
  }
  async componentDidMount(){
    let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/"});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    
    console.log("arreglo: ",arregloDeAlumnos);

    let arreglillo = [];
    for (let element of arregloDeAlumnos.alumnos){
        arreglillo.push({
                        nombre:element.USUARIO.NOMBRE+ " "+ element.USUARIO.APELLIDOS,
                        correo:element.USUARIO.CORREO,
                        checkbox:<div>
                                    <input 
                                      type="checkbox" 
                                      id={element.ID_USUARIO} 
                                      name="alumno" 
                                      value={element.ID_USUARIO}>                                       
                                    </input>
                               </div>
                        });  
    }
    const data = {
        columns: [
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
escogerAlumnos() {
  let alumnosSeleccionados=[]
  for (let element of this.state.alumnos){
    if (element.data.checkbox.checked===true){
      alumnosSeleccionados.push({id:element.ID_USUARIO});  
    }
  }
}
render(){
    return (
        <div>
            <Paper elevation={0} style={style.paper}>
                {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                <TablaAlumnos  alumnos={this.state.alumnos}  />
            </Paper>
        </div>
    );
}

}

export default ListaAlumnos;

const estilo={
imagen:{
    width :"25%"
}
}

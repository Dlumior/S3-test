import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaCoordinador from "./TablaCoordinador";
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


class ListaCoordinadores extends React.Component {
  constructor() {
    super();
    this.state = {
        coordinadores: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        coordinadores:[{id:"1"}]
    };
    //this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);

  }
  async componentDidMount(){
    let aregloCoord=await Controller.GET({servicio:"/api/coordinador/"});
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    
    console.log("arreglo: ",aregloCoord);

    let arreglillo = [];
    for (let element of aregloCoord.coordinadores){
        arreglillo.push({
                        codigo:element.USUARIO.CODIGO,
                        nombre:element.USUARIO.NOMBRE+ " "+ element.USUARIO.APELLIDOS,
                        correo:element.USUARIO.CORREO,
                        boton:<div> 
                                    <Button 
                                        variant="outlined"
                                        color="primary">
                                        Ver Coordinador
                                    </Button>
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
            field:"boton"
           }
        ],
        data: arreglillo
      };
      this.setState({coordinadores:data});
}


render(){
    return (
        <div>
            <Paper elevation={0} style={style.paper}>
                {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                <TablaCoordinador coordinadores={this.state.coordinadores}  />
            </Paper>
        </div>
    );
}

}

export default ListaCoordinadores;

const estilo={
imagen:{
    width :"25%"
}
}

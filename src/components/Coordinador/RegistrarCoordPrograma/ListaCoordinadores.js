import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, IconButton } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaCoordinador from "./TablaCoordinador";
import Button from "@material-ui/core/Button";
import ModificaCoordinador from "./ModificarCoordP";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EliminarCoordinador from "../../Administrador/RegistrarCoordinador/EliminarCoordinador";

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


class ListaCoordinadores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        coordinadores: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        coordinadores:[{id:"1"}]
    };
    this.establecerData = this.establecerData.bind(this);    
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnOpenEliminar = this.handleOnOpenEliminar.bind(this);


  }
  establecerData(arregloCoord){
    let arreglillo = [];
    for (let element of arregloCoord.coordinadores){
        arreglillo.push({
                        codigo:element.CODIGO,
                        nombre:element.NOMBRE+ " "+ element.APELLIDOS,
                        correo:element.CORREO,
                        boton:<div> 
                                    <IconButton color="primary">
                                          <EditRoundedIcon
                                          color="secondary"
                                          fontsize="large"
                                          onClick={() => this.handleOnOpen(element.ID_USUARIO)}
                                          />
                                      </IconButton>
                                      <IconButton color="primary">
                                          <DeleteRoundedIcon
                                          color="error"
                                          fontsize="large" 
                                          onClick={() => this.handleOnOpenEliminar(element.ID_USUARIO)}/>
                                          
                                      </IconButton> 
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
  async componentDidUpdate(prevProps){
    if (this.props.idFacu!==prevProps.idFacu){
      console.log("idFacu: ",this.props.idFacu);
      let arregloCoord=await Controller.GET({servicio:"/api/coordinadorprograma/"+this.props.idFacu});
      //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
      console.log("arreglo: ",arregloCoord);
      this.establecerData(arregloCoord);

    }
  }
  async componentDidMount(){
    let arregloCoord=await Controller.GET({servicio:"/api/coordinador/"});    
    console.log("arreglo: ",arregloCoord);
    //this.establecerData(arregloCoord);
}
handleOnOpen= (id) =>{
  this.setState({ open: true });
  this.state.idCoord=id;
} 
handleOnOpenEliminar= (id) =>{
  this.setState({ open2: true });//para el eliminar
  this.state.idCoord=id;
} 
handleOnClose() {
  this.setState({ open: false });
  this.setState({ open2: false });
  window.location.reload();
}


render(){
    return (
        <div>
          {this.state.open && 
            <ModificaCoordinador 
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              id={this.state.idCoord}
              idFacu={this.props.idFacu}
            />}
            {this.state.open2 && 
            <EliminarCoordinador 
              open={this.handleOnOpenEliminar} 
              close={this.handleOnClose}
              id={this.state.idCoord}
            />}
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

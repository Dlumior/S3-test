import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, IconButton } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaProgramas from "./TablaProgramas";
import Button from "@material-ui/core/Button";
import { getUser } from "../../../Sesion/Sesion";
import ModificaPrograma from "./ModificarPrograma";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EliminarPrograma from "./EliminarPrograma";


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
    this.handleOnOpenEliminar = this.handleOnOpenEliminar.bind(this);
  }
  establecerData(arregloProg){
    
    let arreglillo = [];
    let cont=0;
    for (let element of arregloProg.programa){
      if (element.ID_PROGRAMA!==null){
        cont++;
        arreglillo.push({
          codigo:cont,
          nombre:element.NOMBRE,
          boton:<div>
                  <IconButton color="primary">
                      <EditRoundedIcon
                      color="secondary"
                      fontsize="large"
                      onClick={() => this.handleOnOpen(element)}
                      />
                  </IconButton>
                  {getUser().rol==="Coordinador Facultad" &&
                  <IconButton color="primary">
                      <DeleteRoundedIcon
                      color="error"
                      fontsize="large"
                      onClick={() => this.handleOnOpenEliminar(element)} />
                  </IconButton>}  
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
    if (this.props.idFacu!==prevProps.idFacu || this.props.flag!==prevProps.flag 
      || nextState.flag !== this.state.flag){
      console.log("idFacu: ",this.props.idFacu);
      let arregloProg=await Controller.GET({servicio:"/api/programa/lista/"+this.props.idFacu});
      if (arregloProg){
        console.log("arreglo: ",arregloProg);
        this.establecerData(arregloProg);
      }

    }
  }
  async componentDidMount(){
    let idCoord=getUser().usuario.ID_USUARIO;
    console.log("idFacu: ",this.props.idFacu);
    let arregloProg=await Controller.GET({servicio:"/api/programa/coordinador/"+idCoord});
    if (arregloProg){
      console.log("arreglo: ",arregloProg);
      this.establecerData(arregloProg);
    }
  
}

handleOnOpen= (programa) =>{
  this.setState({ open: true });
  console.log("coordinadores del programa",programa);
  this.state.programaConCoord=programa;
} 
handleOnOpenEliminar= (programa) =>{
  this.setState({ open2: true });//para el eliminar
  this.state.programaConCoord=programa;

} 
handleOnClose() {
  this.setState({ open: false });
  this.setState({ open2: false });//para el eliminar
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
            {this.state.open2 && 
            <EliminarPrograma 
              open={this.handleOnOpenEliminar} 
              close={this.handleOnClose}
              id={this.state.programaConCoord.ID_PROGRAMA}
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

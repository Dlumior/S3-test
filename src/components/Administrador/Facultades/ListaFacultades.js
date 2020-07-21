import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText, Grid } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import TablaFacultad from "./TablaFacultad";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from "@material-ui/core/IconButton";
import ModificarFacultad from "./ModificarFacultad";
import EliminarFacultad from "./EliminarFacultad";
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


class ListaFacultades extends React.Component {
  constructor(props) {
    super();
    this.state = {
        facultades: {columns: [{
            title: "Nombre",
            field: "nombre", }],
            data:[{nombre:""}]  },
        facultad:[{id:"1"}],
        facultadCompleta:[],
        flag:0,//actualiza modificar y eliminar
    };
    //this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this);
    this.establecerData = this.establecerData.bind(this);
    this.handleOnOpen = this.handleOnOpen.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnOpenEliminar = this.handleOnOpenEliminar.bind(this);

  }

  establecerData(arregloFac){
    let arreglillo = [];
    let cont=0;
    for (let element of (arregloFac.facultad? arregloFac.facultad : arregloFac.facultades)){
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
                {getUser().rol==="Administrador" &&
                  <IconButton color="primary">
                    <DeleteRoundedIcon
                    color="error"
                    fontsize="large" 
                    onClick={() => this.handleOnOpenEliminar(element)}/>                    
                </IconButton>  }
                </div>
          });  

      }
    }
    const data = {
        columns: [
          {
            title: "Nro",
            field: "codigo",
          },
          {
            title: "Nombre",
            field: "nombre",
          },
          {
            title:"Acciones",
            field:"boton"
           }
        ],
        data: arreglillo
      };
      this.setState({facultades:data});

  }

  async componentDidUpdate(prevProps,nextState){
    if (this.props.facultades!==prevProps.facultades || this.props.flag!==prevProps.flag 
      || nextState.flag !== this.state.flag){
      //console.log("fac",this.props.facultades);
      let arregloFac;
      if (getUser().rol==="Administrador"){
        arregloFac=await Controller.GET({servicio:"/api/facultad/"});
      }else{
        arregloFac=await Controller.GET({servicio:"/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO});
      }
      if (arregloFac){
        //console.log("arreglo: ",arregloFac);
        this.establecerData(arregloFac);
      }
    }    
  }

  async componentDidMount(){
    let arregloFac;
    if (getUser().rol==="Administrador"){
      arregloFac=await Controller.GET({servicio:"/api/facultad/"});
    }else{
      arregloFac=await Controller.GET({servicio:"/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO});
    }
    //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
    if (arregloFac){
      //console.log("arreglo: ",arregloFac);
      this.establecerData(arregloFac);
    }
  }
  handleOnOpen= (element) =>{
    this.setState({ open: true });
    this.state.facultadCompleta=element;
    //console.log("faku",this.state.facultadCompleta);
  } 
  handleOnOpenEliminar= (element) =>{
    this.setState({ open2: true });//para el eliminar
    this.state.facultadCompleta=element;

  } 
  handleOnClose() {
    this.setState({ open: false });
    this.setState({ open2: false });
    //window.location.reload();
  }

  callback = (count) => {
    // do something with value in parent component, like save to state
    let i= this.state.flag +1;
    //console.log("veamos: ",i);
    this.setState({flag:i});
  }

render(){
    return (
        <div>
          {this.state.open && 
            <ModificarFacultad 
              open={this.handleOnOpen} 
              close={this.handleOnClose}
              facultad={this.state.facultadCompleta}
              parentCallback={this.callback}
            />}
            {this.state.open2 && 
            <EliminarFacultad 
              open={this.handleOnOpenEliminar} 
              close={this.handleOnClose}
              id={this.state.facultadCompleta.ID_PROGRAMA}
              parentCallback={this.callback}
            />}
            <Paper elevation={0} style={style.paper}>
                {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                <TablaFacultad facultades={this.state.facultades}  />
            </Paper>
        </div>
    );
}

}

export default ListaFacultades;

const estilo={
imagen:{
    width :"25%"
}
}

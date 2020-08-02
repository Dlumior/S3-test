import React from "react";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import IconButton from "@material-ui/core/IconButton";

import * as Controller from "../../Conexion/Controller";
import EliminarUnidad from "./EliminarUnidad";
import ModificarUnidad from "./ModificarUnidad";
import TablaUnidad from "./TablaUnidad";


const style = {
    paper: {
        marginTop: "3%",
        marginLeft: "3%",
        marginRight:"3%",
        marginBottom: "3%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundImage: "",
    }
};

class ListaUnidadApoyo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unidades: {columns: [{
                title: "Nombre",
                field: "nombre", }],
                data:[{nombre:""}]  },
            unidad:[],
            flag:0,
            idUnidad:'',
            open2:false,
            open3:false,
        };
        this.establecerData = this.establecerData.bind(this);    
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnOpenEliminar = this.handleOnOpenEliminar.bind(this);
    }

    establecerData(arregloUnidades){
        let arreglillo = [];
        for (let element of arregloUnidades.areasApoyo){
            arreglillo.push({
              nombre:element.NOMBRE,
              telefono:element.TELEFONO,
              correo:element.CORREO,
              contacto:element.CONTACTO,
              edit:
                <div> 
                <IconButton color="primary">
                    <EditRoundedIcon
                    color="secondary"
                    fontsize="large"
                    onClick={() => this.handleOnOpenModificar(element)}
                    />
                </IconButton>
                <IconButton color="primary">
                    <DeleteRoundedIcon
                    color="error"
                    fontsize="large" 
                    onClick={() => this.handleOnOpenEliminar(element.ID_AREA_APOYO)}
                    />                    
                </IconButton>
                </div>
    
              });
        }
        const data = {
            columns: [
              {
                title: "Nombre",
                field: "nombre",
              },
              {
                title: "Teléfono",
                field: "telefono",
              },
              {
                title: "Correo",
                field: "correo",
              },
              {
                title:"Contacto",
                field:"contacto"
              },
              {
                title:"",
                field:"edit"
               }
            ],
            data: arreglillo
          };
          this.setState({unidades:data});
    
      } 
    
    async componentDidUpdate(nextState,prevProps){
      console.log("update",this.props.unidades!==prevProps.unidades,this.props.flag!==prevProps.flag ,
      nextState.flag !== this.state.flag)
      console.log("unidadesprops",this.props.flag,prevProps.flag);
      console.log("unidadesstate",nextState.unidades,this.state.unidades);

        if (this.props.flag!==prevProps.flag || nextState.flag !== this.state.flag){
          if (nextState.unidades!==this.state.unidades){
            //console.log("idFacu: ",this.props.idTutoria);
            let arreglo = await Controller.GET({servicio:"/api/areaapoyo"});
            //console.log("arreglo: ",arregloAsigna);
              if (arreglo){
                this.establecerData(arreglo);
              }
          }
          
        }
    }
    async componentDidMount(){
        let arreglo = await Controller.GET({servicio:"/api/areaapoyo"});
        console.log("arreglo: ",arreglo);
        if (arreglo){
            this.establecerData(arreglo);
        }
    }
    handleOnOpenModificar= (element) =>{
        this.setState({ open2: true });
        this.state.unidad=element;
        console.log("unidad",this.state.unidad);    
    } 
    handleOnOpenEliminar= (id) =>{
        this.setState({ open3: true });
        this.state.idUnidad=id;
        console.log("elimina id",this.state.idUnidad);
    } 
    handleOnClose() {
        this.setState({ open2: false });
        this.setState({ open3: false });
    
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
            {this.state.open2 && 
            <ModificarUnidad
              open={this.handleOnOpenModificar} 
              close={this.handleOnClose}
              unidad={this.state.unidad}
              parentCallback={this.callback}
            />}
            {this.state.open3 && 
            <EliminarUnidad
              open={this.handleOnOpenEliminar} 
              close={this.handleOnClose}
              id={this.state.idUnidad}
              parentCallback={this.callback}
            />}
            <Paper elevation={0} style={style.paper}>
                <TablaUnidad unidades={this.state.unidades}  />
            </Paper>
            </div>
        );
    }
}

export default ListaUnidadApoyo;
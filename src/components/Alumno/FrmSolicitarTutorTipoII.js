import React, { Component } from "react";
import * as Controller from "./../../Conexion/Controller";
import {Paper,Tabs,Tab,Radio,} from "@material-ui/core";
import TablaTutores from "./TablaTutores.js";

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


class FrmSolicitarTutorTipoII extends Component {
    constructor() {
        super();
        this.state={
            tutores: {columns: [{
                title: "Nombre",
                field: "nombre", }],
                data:[{nombre:"TySEsMiPastor"}]  }
        };    
        
        {/* 
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChangePrograma = this.handleOnChangePrograma.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        */}
        
    };
    
    async componentDidMount(){
        let arregloDeTutores=await Controller.GET({servicio:"/api/tutor"});
        console.log("arreglo: ",arregloDeTutores);

        let arreglillo = [];
        let cont=0;
        for (let element of arregloDeTutores.tutores){
            cont++;
            arreglillo.push({numeroOrden:cont,
                            nombre:element.USUARIO.NOMBRE+ " "+ element.USUARIO.APELLIDOS,
                            correo:element.USUARIO.CORREO,
                            /*rboton:<Radio value={element.ID_TUTOR}
                                          color="primary"
                                          checkedIcon={true} />}*/
                            rboton:<div>
                                        <input 
                                        type="radio" 
                                        id="age1" 
                                        name="tutor" 
                                        value={element.ID_TUTOR}>                                       
                                        </input>
                                   </div>,
                            imagen:<div>
                                        <img 
                                        style={estilo.imagen}
                                        src="https://pps.whatsapp.net/v/t61.24694-24/76633458_696724491134649_6543062526296892872_n.jpg?oe=5ECCD65C&oh=c0e140eec24c477fbfdc4ee4254c54c6">
                                       
                                        </img>
                                    </div>
                            });  
        }
        
        /*arregloDeTutores.forEach(element => {
            arreglillo.push({nombre:element.USUARIO.NOMBRE+" "+element.USUARIO.APELLIDOS,
                            correo:element.USUARIO.CORREO});       

        }); */

        const data = {
            columns: [
               {
                title:"N°",
                field:"numeroOrden"
               }, 
              {
                title: "Nombre",
                field: "nombre",
              },
              { title:"Correo Electrónico",
                field:"correo"},
               {
                title:"",
                field:"rboton"
               }, 
               {
                title:"Imagen",
                field:"imagen",
               },
              /*  {},{},{}.... para mas columnas  */
            ],
            data: arreglillo
            /*
            [       
                
              { nombre: "Alva Nuñez",correo :"ing informatica" },
              { nombre: "Pedro Arce" ,correo :"ing informatica2"},
              { nombre: "Alfredo Gomez",correo :"ing informatica3" },
              { nombre: "Bill Grace",correo :"ing informatica4" },
              { nombre: "Camilo Echeverry" ,correo :"ing informatica5"},
            ],*/


          };

          this.setState({tutores:data});

    }

    render(){
        return (
            <div>
                <Paper elevation={0} style={style.paper}>
                    <Tabs
                    centered
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        //onChange={this.handleTabOnChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Tutores"/>
                        
                    </Tabs>
                    {/*<TablaTutores  tutores={arregloDeTutores}  />*/}
                    <TablaTutores  tutores={this.state.tutores}  />
            </Paper>
            </div>
        );
    }
    
}

export default FrmSolicitarTutorTipoII;

const estilo={
    imagen:{
        width :"25%"
    }
}

















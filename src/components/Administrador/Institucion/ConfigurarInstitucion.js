import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,Grid,FormControl, FormHelperText, TextField, Typography } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import axios from 'axios';

const style = {
    paper: {
      marginTop: "4%",
      marginLeft: "4%",
      marginRight: "4%",
      marginBottom: "5%",
      flexDirection: "row",
      alignItems: "center",
      backgroundImage: "",
    },
    paperitem: {
        marginTop: "2%",
        marginLeft: "4%",
      },
      foto: {
        marginTop: "2%",
        marginLeft: "4%",
        marginTop: "4%",
        flexDirection: "row",
        alignItems: "center",
        backgroundImage: "",
      }
  };

class ConfigurarInstitucion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        institucion:{
            ID_INSTITUCION:'',
            NOMBRE:'Pontificia Universidad Católica del Perú',
            INICIALES:'PUCP',
            IMAGEN:'',
            TELEFONO:'5256000',
            PAGINA_WEB:'www.pucp.edu.pe',
            DOMINIO:'@pucp.edu.pe',
            UBICACION:'Av. Universitaria',
            EXTENSION:'',  
        }
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangeNombre = this.handleOnChangeNombre.bind(this);
    this.handleOnChangeInicial = this.handleOnChangeInicial.bind(this);
    this.handleOnChangeDominio = this.handleOnChangeDominio.bind(this);
    this.handleOnChangeTelefono = this.handleOnChangeTelefono   .bind(this);
    this.handleOnChangeUbicacion = this.handleOnChangeUbicacion.bind(this);
    this.handleOnChangePagina = this.handleOnChangePagina.bind(this);
    this.handleOnChangeImg = this.handleOnChangeImg .bind(this);


  } 
  
  handleOnChangeNombre = (event) => {
    console.log("nombre:", event.target.value);
    this.state.institucion.NOMBRE = event.target.value;
    console.log("nombre:", this.state.institucion.NOMBRE);
  }
  handleOnChangeInicial = (event) => {
    console.log("inicial:", event.target.value);
    this.state.institucion.INICIALES = event.target.value;
    console.log("inicial:", this.state.institucion.INICIALES);
  }
  handleOnChangeDominio = (event) => {
    console.log("Dominio:", event.target.value);
    this.state.institucion.DOMINIO = event.target.value;
    console.log("dominio:", this.state.institucion.DOMINIO);
  }
  handleOnChangeTelefono = (event) => {
    console.log("telefono:", event.target.value);
    this.state.institucion.TELEFONO = event.target.value;
    console.log("telefono:", this.state.institucion.TELEFONO);
  }
  handleOnChangeUbicacion = (event) => {
    console.log("ubicacion:", event.target.value);
    this.state.institucion.UBICACION = event.target.value;
    console.log("ubicacion:", this.state.institucion.UBICACION);
  }
  handleOnChangePagina = (event) => {
    console.log("pagina:", event.target.value);
    this.state.institucion.PAGINA_WEB = event.target.value;
    console.log("pagina:", this.state.institucion.PAGINA_WEB);
  }
  handleOnChangeImg = (event) => {    
    this.setState({
        imagen:event.target.files[0]
    })
  }
  async handleOnClick(e) {
    e.preventDefault();
    console.log("institucion: ", this.state.institucion);
    let {
      NOMBRE,
      INICIALES,
      DOMINIO,
      TELEFONO,
      UBICACION,
      PAGINA_WEB
    } = this.state.institucion;
    const nuevaInstitucion = {
      institucion: {
        ID_INSTITUCION:'1',
        NOMBRE: NOMBRE,
        INICIALES: INICIALES,
        IMAGEN:"",
        DOMINIO: DOMINIO,
        TELEFONO: TELEFONO,
        PAGINA_WEB: PAGINA_WEB,
        UBICACION: UBICACION,
        EXTENSION:"",
      },
    };
    const props = { servicio: "/api/institucion/modificar", request: nuevaInstitucion };
    console.log("saving new uni in DB:", nuevaInstitucion);
    let nuevaUni = await Controller.POST(props);
    console.log("lo que viene del POST:", nuevaUni);
    if (nuevaUni) {
      alert("Institucion registrada Satisfactoriamente");
    }
    console.log("got updated institucion from back:", nuevaUni);
  }

async componentDidMount() {
    let getInsitucion=await Controller.GET({servicio:"/api/institucion"});
    console.log("got institucion from back:", getInsitucion);
    this.setState({institucion:getInsitucion});
    console.log("state:", this.state.institucion);   
    console.log("state:", getInsitucion.institucion.NOMBRE); 
}

render(){
    return (
        <div>
            <Paper elevation={2} style={style.paper}>
                <Grid container spacing={3}
                    md={10}
                    justify="center"
                >
                <Grid item md={12} justify="center" >
                    <Paper elevation={0} style={style.paperitem}>
                        <Typography variant="h5">
                            Datos Generales
                        </Typography>
                    </Paper>
                </Grid>
                <Paper elevation={0} style={style.foto}>
                    <Grid container spacing={3} md={4} justify="center">
                        <Grid item md={10}>
                            <div>
                                <img
                                    style={estilo.imagen}
                                    src="https://images.app.goo.gl/baPrAmhutyknBpsK6">
                                </img>
                                <input type="file"
                                    onChange={this.handleOnChangeImg}>
                                </input>
                            </div>                            
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={0} style={style.paperitem}>
                    <Grid container spacing={2} md={10} justify="center">    
                        <Grid item md={10}>
                            <TextField
                                required
                                margin="dense"
                                id="NOMBRE"
                                label="Nombre"
                                defaultValue={this.state.institucion.NOMBRE}
                                onChange={this.handleOnChangeNombre}
                                fullWidth   
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>                           
                        <Grid item md={10}>
                            <TextField
                                required
                                margin="dense"
                                id="iniciales"
                                label="Iniciales"
                                defaultValue={this.state.institucion.INICIALES}
                                onChange={this.handleOnChangeInicial}
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={10}>
                            <TextField
                                required
                                margin="dense"
                                id="DOMINIO"
                                label="Dominio"
                                defaultValue={this.state.institucion.DOMINIO}
                                onChange={this.handleOnChangeDominio}
                                fullWidth
                            />
                        </Grid>  
                                                                  
                    </Grid>
                </Paper>
                <Paper elevation={0} style={style.paperitem}>
                    <Grid container spacing={3} md={10} justify="center">    
                        <Grid item md={10}>
                            <TextField
                                margin="dense"
                                id="telefono"
                                label="Telefono"
                                defaultValue={this.state.institucion.TELEFONO}
                                onChange={this.handleOnChangeTelefono}
                                fullWidth
                            />
                        </Grid>                           
                        <Grid item md={10}>
                            <TextField
                                margin="dense"
                                id="ubicacion"
                                label="Ubicación"
                                defaultValue={this.state.institucion.UBICACION}
                                onChange={this.handleOnChangeUbicacion}
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={10}>
                            <TextField
                                margin="dense"
                                id="sitioweb"
                                label="Sitio Web"
                                defaultValue={this.state.institucion.PAGINA_WEB}
                                onChange={this.handleOnChangePagina}
                                fullWidth
                            />
                        </Grid>                                            
                    </Grid>
                </Paper>
                </Grid>
                <Paper elevation={0} style={style.paper}>
                    <Grid container spacing={2} md={5} justify="flex-end">
                        <Grid item>
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={this.handleOnClick}>
                                Guardar
                            </Button>

                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined"
                                color="primary">
                                Cancelar
                            </Button>
                        </Grid>                        
                    </Grid>
                </Paper>
            </Paper>
        </div>
    );
}

}
export default ConfigurarInstitucion;

const estilo = {
    imagen: {
        width: "50%",
        "border-radius": "100%",
    }
}

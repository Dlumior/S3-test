import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,Grid,FormControl, FormHelperText, TextField, Typography } from "@material-ui/core";
import * as Controller from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Alertas from "../../Coordinador/Alertas";

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
            ID:'1',
            NOMBRE:props.institucion.NOMBRE,
            INICIALES:props.institucion.INICIALES,
            IMAGEN:props.institucion.IMAGEN,
            TELEFONO:props.institucion.TELEFONO,
            PAGINA_WEB:props.institucion.PAGINA_WEB,
            DOMINIO:props.institucion.DOMINIO,
            UBICACION:props.institucion.UBICACION,
            EXTENSION:props.institucion.EXTENSION,  
        },
        deshabilitar:true,
        alert: {
          mensajeStrong: "",
          mensajeStrongError: "porfavor revisalos!",
          mensajeStrongExito: "satisfactoriamente!",
          mensajeError: "Existen errores al completar el formulario",
          mensajeExito: "Se modificaron los datos de la institucion",
          mensaje: "",
        },
        severidad: "warning",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChangeNombre = this.handleOnChangeNombre.bind(this);
    this.handleOnChangeInicial = this.handleOnChangeInicial.bind(this);
    this.handleOnChangeDominio = this.handleOnChangeDominio.bind(this);
    this.handleOnChangeTelefono = this.handleOnChangeTelefono   .bind(this);
    this.handleOnChangeUbicacion = this.handleOnChangeUbicacion.bind(this);
    this.handleOnChangePagina = this.handleOnChangePagina.bind(this);
    this.handleOnChangeImg = this.handleOnChangeImg .bind(this);
    this.handleHabilitar=this.handleHabilitar.bind(this);


  } 
  
  handleOnChangeNombre = (event) => {
    console.log("nombre:", event.target.value);
    this.state.institucion.NOMBRE = event.target.value;
    this.setState(this.state.institucion);
    console.log("nombre:", this.state.institucion.NOMBRE);
  }
  handleOnChangeInicial = (event) => {
    console.log("inicial:", event.target.value);
    this.state.institucion.INICIALES = event.target.value;
    this.setState(this.state.institucion);
    console.log("inicial:", this.state.institucion.INICIALES);
  }
  handleOnChangeDominio = (event) => {
    console.log("Dominio:", event.target.value);
    this.state.institucion.DOMINIO = event.target.value;
    this.setState(this.state.institucion);
    console.log("dominio:", this.state.institucion.DOMINIO);
  }
  handleOnChangeTelefono = (event) => {
    console.log("telefono:", event.target.value);
    this.state.institucion.TELEFONO = event.target.value;
    this.setState(this.state.institucion);
    console.log("telefono:", this.state.institucion.TELEFONO);
  }
  handleOnChangeUbicacion = (event) => {
    console.log("ubicacion:", event.target.value);
    this.state.institucion.UBICACION = event.target.value;
    this.setState(this.state.institucion);
    console.log("ubicacion:", this.state.institucion.UBICACION);
  }
  handleOnChangePagina = (event) => {
    console.log("pagina:", event.target.value);
    this.state.institucion.PAGINA_WEB = event.target.value;
    this.setState(this.state.institucion);
    console.log("pagina:", this.state.institucion.PAGINA_WEB);
  }
  handleOnChangeImg = (event) => {    
    this.setState({
        imagen:event.target.files[0]
    })
  }
  handleHabilitar = (event) => {    
    this.setState({
        deshabilitar:false,
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
        ID:'1',
        NOMBRE: NOMBRE,
        INICIALES: INICIALES,
        IMAGEN:"",
        TELEFONO: TELEFONO,
        PAGINA_WEB: PAGINA_WEB,
        UBICACION: UBICACION,
        DOMINIO: DOMINIO,        
        EXTENSION:"",
      },
    };
    if (this.state.institucion.NOMBRE==='' || this.state.institucion.INICIALES==='' ||
    this.state.institucion.DOMINIO===''){
      let alert = Object.assign({}, this.state.alert);
      alert.mensaje = alert.mensajeError;
      alert.mensajeStrong = alert.mensajeStrongError;
      this.setState({ alert: alert });
      this.setState({ severidad: "error" });
      this.state.alert.mensaje = this.state.alert.mensajeError;
    }else{
      const props = { servicio: "/api/institucion/modificar", request: nuevaInstitucion };
      console.log("saving new uni in DB:", nuevaInstitucion);
      let nuevaUni = await Controller.POST(props);
      console.log("lo que viene del POST:", nuevaUni);
      if (nuevaUni) {
        let alert = Object.assign({}, this.state.alert);
        alert.mensaje = alert.mensajeExito;
        alert.mensajeStrong = alert.mensajeStrongExito;
        this.setState({ alert: alert });
        this.setState({ severidad: "success" });
        this.state.alert.mensaje = this.state.alert.mensajeExito;

        console.log("got updated institucion from back:", nuevaUni);
        this.setState({
          deshabilitar:true,
      })
    }
      
    }
  }

async componentDidMount() {
    let getInsitucion=await Controller.GET({servicio:"/api/institucion"});
    console.log("got institucion from back:", getInsitucion.institucion);
    this.setState({institucion:getInsitucion.institucion});
    console.log("state:", this.state.institucion);   
    console.log("state:", getInsitucion.institucion.NOMBRE); 

    
}

render(){
    return (
        <div>
            <Paper elevation={2} style={style.paper}>
            <Alertas
              severity={this.state.severidad}
              titulo={"Observacion:"}
              alerta={this.state.alert}
            />
                <Grid container spacing={3}
                    md={12}
                    justify="center"
                >
                <Grid item md={10} justify="flex-start" >
                    <Paper elevation={0} style={style.paperitem}>
                        <Typography variant="h5">
                            Datos Generales
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item md={2} justify="flex-end" >
                  <Button 
                      variant="outlined"
                      color="primary"
                      onClick={this.handleHabilitar}>
                      Editar
                  </Button>
                </Grid>
                <Grid item md={4} >
                    <div>
                        <img
                            style={estilo.imagen}
                            src="https://www.w3schools.com/howto/img_avatar.png">
                        </img>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            component="label"
                            color="primary"
                            >
                            Importar
                            <input
                                type="file"
                                onChange={this.handleOnChangeImg}
                                style={{ display: "none" }}
                            />
                        </Button>
                    </div>                            
                </Grid>
                <Grid item md={6}> 
                        <TextField
                            required
                            disabled={this.state.deshabilitar}
                            margin="dense"
                            id="NOMBRE"
                            label="Nombre"
                            value={this.state.institucion.NOMBRE}
                            onChange={this.handleOnChangeNombre}
                            fullWidth   
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />        
                        <TextField
                            required
                            disabled={this.state.deshabilitar}
                            margin="dense"
                            id="iniciales"
                            label="Iniciales"
                            value={this.state.institucion.INICIALES}
                            onChange={this.handleOnChangeInicial}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                          }}
                        />
                        <TextField
                            required
                            disabled={this.state.deshabilitar}
                            margin="dense"
                            id="DOMINIO"
                            label="Dominio"
                            value={this.state.institucion.DOMINIO}
                            onChange={this.handleOnChangeDominio}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                          }}
                        />
                        <TextField
                            disabled={this.state.deshabilitar}
                            margin="dense"
                            id="telefono"
                            label="Telefono"
                            value={this.state.institucion.TELEFONO}
                            onChange={this.handleOnChangeTelefono}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                          }}
                        />          
                        <TextField
                            disabled={this.state.deshabilitar}
                            margin="dense"
                            id="ubicacion"
                            label="Ubicación"
                            value={this.state.institucion.UBICACION}
                            onChange={this.handleOnChangeUbicacion}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                          }}
                        />
                        <TextField
                          disabled={this.state.deshabilitar}
                          margin="dense"
                          id="sitioweb"
                          label="Sitio Web"
                          value={this.state.institucion.PAGINA_WEB}
                          onChange={this.handleOnChangePagina}
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />                       
                    </Grid>
                </Grid>
                    <Grid container spacing={2} md={5} justify="center">
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
        </div>
    );
}

}
export default ConfigurarInstitucion;

const estilo = {
    imagen: {
        width: "50%",
        borderRadius: "100%",
    }
}

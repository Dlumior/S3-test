import React, { Component } from "react";
import * as Controller from "../../../../Conexion/Controller";

import { Paper, Tabs, Tab, Button, Grid, Dialog, Typography} from "@material-ui/core";
import TablaCitasPasadas from "./TablaCitasPasadas";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "./Slider";

import { getUser } from "../../../../Sesion/Sesion";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Switch from "./Switch";
import Alertas from "../../../Coordinador/Alertas";


const style = {
    paper: {
        marginTop: "3%",
        marginLeft: "3%",
        marginRight: "3%",

        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundImage: "",
    }
};

class FrmMisCitas extends Component {
    constructor() {
        super();
        this.state = {
            sesiones: {
                columns: [{
                    title: "Nombre",
                    field: "nombre",
                }],
                data: [{ nombre: "" }]
            }, 
            open: false,
            deshabilitar:[{valor:true}],
            encuesta:{
                sesion:'',
                acompana:1,
                utilidad:1,
                influyo:false,
                ayudo:false,
                recomienda:false,
            },
            alert: {
                mensajeStrong: "",
                mensajeStrongError: "Por favor revísalos",
                mensajeStrongExito: "Satisfactoriamente",
                mensajeError: "Existen errores al completar el formulario",
                mensajeExito: "Se modificaron los datos de la institucion",
                mensaje: "",
              },
            severidad: "warning",
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnOpen = this.handleOnOpen.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleOnChangeAcompaña=this.handleOnChangeAcompaña.bind(this);
        this.handleOnChangeUtilidad=this.handleOnChangeUtilidad.bind(this);
        this.handleOnChangeUtilizoRec=this.handleOnChangeUtilizoRec.bind(this);
        this.handleOnChangeSoluciono=this.handleOnChangeSoluciono.bind(this);
        this.handleOnChangeRecomendaria=this.handleOnChangeRecomendaria.bind(this);
        this.establecerData=this.establecerData.bind(this);

        
        
    };

    //de Valorar
    handleOnOpen= (e) =>{
        this.setState({ open: true });
        //console.log("ses: ",e);
        this.state.encuesta.sesion=e;

    }
    handleOnChangeAcompaña= (event,newValue) =>{
        //console.log("Acompaña: ",newValue);
        this.state.encuesta.acompana=newValue;
        //this.setState({ encuesta: encuesta });

        //let enc = Object.assign({}, this.state.encuesta);
        //enc.acompana = newValue;
        //this.setState({ encuesta: enc });
        //event.target.value=this.state.encuesta.acompana;
        //console.log("enc.acompa: ",this.state.encuesta.acompana);
    }
    handleOnChangeUtilidad= (event,newValue) => {
        //console.log("Utilidad: ",newValue);
        this.state.encuesta.utilidad=newValue;
    }
    handleOnChangeUtilizoRec= (event) => {
        //console.log("Utilizo rec: ",event.target.checked);
        this.state.encuesta.influyo=event.target.checked;
    }
    
    handleOnChangeSoluciono= (event) => {
        //console.log("ayudo: ",event.target.checked);
        this.state.encuesta.ayudo=event.target.checked;
    }
    handleOnChangeRecomendaria= (event) => {
        //console.log("Recomendaria: ",event.target.checked);
        this.state.encuesta.recomienda=event.target.checked;
    }
    handleOnClose() {
        this.setState({ open: false });
        let alert = Object.assign({}, this.state.alert);    
        alert.mensaje = "";
        alert.mensajeStrong = "";
        this.setState({ alert: alert });
        this.setState({ severidad: "" });
        this.state.encuesta.sesion=null;
    }    
    async handleOnClick(){
        //this.setState({ open: true });
        //console.log("encuesta: ", this.state.encuesta);
        var utilizo_rec,soluciono,recomienda;
        if (this.state.encuesta.influyo){
            utilizo_rec=1;
        }else{
            utilizo_rec=0;
        }
        if (this.state.encuesta.ayudo){
            soluciono=1;
        }else{
            soluciono=0;
        }
        if (this.state.encuesta.recomienda){
            recomienda=1;
        }else{
            recomienda=0;
        }
        const nuevaEncuesta = {
            encuesta: {
                ID_ALUMNO:getUser().usuario.ID_USUARIO,
                ID_SESION:this.state.encuesta.sesion,
                SATISFACCION:this.state.encuesta.acompana,
                UTILIDAD:this.state.encuesta.utilidad,
                UTILIZO_RECOMENDACIONES:utilizo_rec,
                SOLUCIONO_SITUACION:soluciono,
                RECOMENDARIA:recomienda,
            },
          };
        const props = { servicio: "/api/encuesta", request: nuevaEncuesta };
        //console.log("saving new in DB:", nuevaEncuesta);
        let enc = await Controller.POST(props);
        //console.log("lo que viene del POST:", enc);
        let alert = Object.assign({}, this.state.alert);
        
        this.state.deshabilitar[this.state.encuesta.sesion]=true;
        //console.log("Se deshabilito?", this.state.deshabilitar[this.state.encuesta.sesion]);

        if (enc.encuesta){
            alert.mensaje = "Encuesta Registrada";
            alert.mensajeStrong = "satisfactoriamente";
            this.setState({ alert: alert });
            this.setState({ severidad: "success" });
        }else if (enc.error){
            alert.mensaje = "La encuesta ya ha sido registrada previamente";
            this.setState({ alert: alert });
            this.setState({ severidad: "error" });

        }else{
            alert.mensaje = "Encuesta Invalida, revisar errores";
            this.setState({ alert: alert });
            this.setState({ severidad: "error" });

        }

    }
    establecerData(arregloDeSesiones){
        let arreglillo = [];
        let cont = 0;
        for (let element of arregloDeSesiones.data) {
            //cont++;
            let estadillo = element.ESTADO.split("-")[0];
            if (estadillo=="00" || estadillo==="01"){
                cont++;
                arreglillo.push({
                    campoCont: cont,
                    nombre: element.TUTOR ? element.TUTOR.USUARIO.NOMBRE + " " + element.TUTOR.USUARIO.APELLIDOS : "",
                    fecha: element.FECHA + " / " + element.HORA_INICIO + " - " + element.HORA_FIN,                    
                    campoLugar: element.LUGAR,
                    tipoTutoria: element.PROCESO_TUTORIum.NOMBRE,
                    campoEncuesta: 
                    <div>
                        <Button
                            size="large"
                            variant="outlined"
                            color="secondary"                        
                            onClick={() => this.handleOnOpen(element.ID_SESION)}
                            disabled={this.state.deshabilitar[element.ID_SESION]}
                        >
                            Valorar
                        </Button>

                    </div>
                    
                });

            }
        }

        const data = {
            columns: [
                {
                    title: "N°",
                    field: "campoCont",

                },
                {
                    title: "Tutor",
                    field: "nombre",
                },
                {
                    title: "Fecha / Hora",
                    field: "fecha"
                },
                {
                    title: "Lugar",
                    field: "campoLugar"
                },
                {
                    title: "Tipo Tutoria",
                    field: "tipoTutoria"
                },
                {
                    title: "Encuesta",
                    field: "campoEncuesta"
                },              

            ],
            data: arreglillo
        };

        this.setState({ sesiones: data });

    }
    /*
    async componentDidUpdate(prevState){
        if (this.state.deshabilitar!==prevState.deshabilitar){
          let arregloDeSesiones =
            await Controller.GET({ servicio: "/api/listaSesionAlumno/" + getUser().usuario.ID_USUARIO });
          //let arregloDeAlumnos=await Controller.GET({servicio:"/api/alumno/lista/"+this.props.idPrograma});
          this.establecerData(arregloDeSesiones);
    
        }
    }*/
    async componentDidMount() {
        let arregloDeSesiones =
            await Controller.GET({ servicio: "/api/listaSesionAlumno/" + getUser().usuario.ID_USUARIO });
        
            this.establecerData(arregloDeSesiones);

    }

    render() {
        return (
            <div>
                
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOnClose}
                    aria-labelledby="form-dialog-title"
                >
                    <Alertas
                    severity={this.state.severidad}
                    titulo={"Observación:"}
                    alerta={this.state.alert}
                    />
                    <DialogTitle id="form-dialog-title">
                        <Grid container md={12} justify="space-between" direction="row">
                        <Grid item md={11} >
                            <Typography variant="h5">
                            Encuesta de Satisfacción
                            </Typography>
                        </Grid>
                        <Grid item md={1}>
                            <CloseRoundedIcon onClick={this.handleOnClose}/>
                        </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container md={12} alignItems="space-between" direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h6">
                                    Acompañamiento de la tutoria
                                </Typography>
                            </Grid>                            
                            <Grid container md={12} justify="space-evenly">
                                <Grid item>
                                    <Typography gutterBottom>No satisfecho</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom>Completamente satisfecho</Typography>
                                </Grid>
                                <Slider
                                    value={this.state.encuesta.acompana}
                                    setValue={this.handleOnChangeAcompaña}
                                >
                                </Slider>
                            </Grid>
                            <Grid item>
                            <Typography variant="h6">
                                Utilidad de la tutoria
                            </Typography>
                            </Grid>                           
                            <Grid container md={12} justify="space-evenly">
                                <Grid item>
                                    <Typography gutterBottom>No satisfecho</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom>Completamente satisfecho</Typography>
                                </Grid>
                                <Slider 
                                    value={this.state.encuesta.utilidad}
                                    setValue={this.handleOnChangeUtilidad}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h6">
                                    ¿Utilizaste las recomendaciones para tomar desiciones?
                                </Typography>                                
                            </Grid> 
                            <Grid item md={12}>
                                <Switch
                                    value={this.state.encuesta.influyo}
                                    setSwitch={this.handleOnChangeUtilizoRec}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h6">
                                    ¿La tutoría ayudó a solucionar la situación?
                                </Typography>                                
                            </Grid> 
                            <Grid item md={12}>
                                <Switch
                                    value={this.state.encuesta.ayudo}
                                    setSwitch={this.handleOnChangeSoluciono}
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h6">
                                    ¿Recomendaría la tutoría?
                                </Typography>                                
                            </Grid> 
                            <Grid item md={12}>
                                <Switch
                                    value={this.state.encuesta.recomienda}
                                    setSwitch={this.handleOnChangeRecomendaria}
                                />
                            </Grid>
                            
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            size="large"
                            variant="outlined"
                            color="primary"
                            onClick={this.handleOnClose}                        >
                            Cancelar
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.handleOnClick}                        >
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>

                <TablaCitasPasadas tutores={this.state.sesiones} />
            </div>
        );
    }
}

export default FrmMisCitas;

const estilo = {
    imagen: {
        width: "30%",
        borderRadius: "100%",
    }
}

import React, { Component } from "react";
import ImagenCircular from "../Shared/ImagenCircular";
import { Grid, Chip, Paper,TextField } from "@material-ui/core";
import FerCarrillo from "./tutor2.png";

import ListaCombobMotivoSoli from "./ListaCombobMotivoSoli.js";
import { diasSemana, mesesAnio } from "./AgendarCita/Util";

const styles = {
    paper: {
        marginTop: "10%",
        marginLeft: "3%",
        marginRight: "3%",
        flexDirection: "column",
        backgroundImage: "",
    },
    chip: {
        textAlign: "center"
    }
};

class FrmDialogoSolicitarTutor extends Component {

    render() {

        const _disponibilidad = this.props.dispo;
        console.log("XXX ",_disponibilidad);

        const _fexilla = new Date(this.props.fexaForm);

        return (
            <div >
                <Paper elevation={3} style={styles.paper}>
                    <Grid container spacing={2} alignContent="center" style={styles.chip}>
                        <Grid item md={4} xs={4}>
                            {/*<ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" />*/}
                            <ImagenCircular src= {FerCarrillo}/>
                        </Grid>
                        <Grid item md={8} xs={8} >
                            <h1>{_disponibilidad.TUTOR.USUARIO.NOMBRE +" "+_disponibilidad.TUTOR.USUARIO.APELLIDOS }</h1>
                            <p>Tutor</p>
                            <p>{diasSemana[_fexilla.getDay()]  + " "+ _fexilla.getDate() + " de " +mesesAnio[_fexilla.getMonth()]+ " del 2020"}</p>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={styles.paper}>
                    <Grid container spacing={2} alignContent="center" style={styles.chip}>    
                        <Grid item md={6}  style={styles.chip}>
                            <p>INICIO : </p>
                            <Chip label={_disponibilidad.HORA_INICIO} color="primary"  />
                        </Grid>
                        <Grid item md={6} style={styles.chip}>
                            <p>FIN : </p>
                            <Chip label={_disponibilidad.HORA_FIN}color="primary"  />
                        </Grid>
                        <Grid item md={8} xs={8} >
                            {/*<h1>Motivo: </h1>*/}
                            <ListaCombobMotivoSoli
                                   titulo={"Motivo de Solicitud"}
                                   //enlace={"/api/programa"}
                                   //id={"ID_PROGRAMA"}
                                   //nombre={"NOMBRE"}
                                   //keyServicio={"programa"}
                                   escogerItem={this.handleOnChange}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} >

                        <Paper elevation={0} style={estilos.paper}>
                            <TextField
                            required={true}
                            autoFocus={true}
                            fullWidth
                            name={"descripcion"}
                            label={"Descripción"}
                            //onChange={this.handleOnChange}
                            //disabled={this.props.disabled || false}
                            variant={"outlined"}
                            rows={4}
                            multiline={true}
                            //value={this.state.texto}
                            />
                        </Paper>
                            
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default FrmDialogoSolicitarTutor;

const estilos = {
    paper: {
      marginLeft: "10%",
      marginRight: "10%",
      marginTop: "3%",
      flexDirection: "column",
    },
  };
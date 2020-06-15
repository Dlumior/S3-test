import React, { Component } from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { IconButton, Grid, Typography, Paper } from "@material-ui/core";
import ListaComboBox from "../../Coordinador/Tutorias/ListaComboBox";
const styles = {
  control: {
    textAlign: "center",
  },
};
class Controles extends Component {
  constructor() {
    super();
    this.state = {
      atras: -1,
      adelante: 1,
    };
    this.saltoEnElTiempoLocal = this.saltoEnElTiempoLocal.bind(this);
  }
  saltoEnElTiempoLocal = (saltoEnElTiempo) => {
    //console.log( "1 semana al pasado");
    this.props.saltoEnElTiempo(saltoEnElTiempo);
  };
  handleOnChangeProceso(proceso) {
    console.log("proceso seleccionado: ", proceso);
  }
  render() {
    return (
      <div>
        <Paper>
          <Grid container spacing={0} alignContent="center">
          <Grid item md={2} xs={2}>
            
          </Grid>
          
          <Grid item md={2} xs={2}>
            
          </Grid>
          <Grid item md={3} xs={4}>
            <h4 style={styles.control}>
              {"Hoy: " + new Date(this.props.fecha.fecha).toDateString()}{" "}
            </h4>
          </Grid>

          
          <Grid item md={2} xs={2}>
            
          </Grid>
          
          <Grid item md={2} xs={2}>
            
          </Grid>
        </Grid>
        </Paper>
        
      </div>
    );
  }
}

export default Controles;

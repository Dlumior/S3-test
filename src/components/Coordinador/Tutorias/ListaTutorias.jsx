import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight: "3%",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    },
}
class ListaTutorias extends Component {
  render() {
    /**
     * Please do not touch my code
     *
     * I'm in construction
     */
    return (
      <Paper elevation={0} style={style.paper}>
        Lista de Tutorias TO-DO
        <img src="https://ututor-recursos.s3.amazonaws.com/KND_construccion.png"/>
      </Paper>
    );
  }
}

export default ListaTutorias;
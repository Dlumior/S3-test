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
        return (
            <Paper elevation={5} style={style.paper}>
            Lista de Tutorias TO-DO
          </Paper>
        );
    }
}

export default ListaTutorias;
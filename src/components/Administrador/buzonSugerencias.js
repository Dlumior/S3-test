import React, { Component } from "react";
import NombrePrincipal from "../Shared/NombrePrincipal";
import TabProceso from "../Coordinador/Tutorias/TabProceso";
import FrmBuzon from "./FrmBuzon";
import { Paper } from "@material-ui/core";


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight:"3%",
      marginBottom:"3%",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      backgroundImage: "",
    }
  };


class BuzonSugerencias extends Component {

    constructor() {
        super();
        this.state = {
            procesos: [
                { index:0,titulo: "", proceso:() => <FrmBuzon /> }
              ],
        };
    };

    render() {
        return (
            <div>
                <NombrePrincipal titulo={"Buzón de sugerencias recibidas "} />
                <Paper elevation={0} style={style.paper}>
                    <TabProceso  procesos={this.state.procesos} />
                </Paper>     
            </div>
        );
    }

}
export default BuzonSugerencias;

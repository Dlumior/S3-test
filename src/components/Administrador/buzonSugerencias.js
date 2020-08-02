import React, { Component } from "react";
import NombrePrincipal from "../Shared/NombrePrincipal";
import TabProceso from "../Coordinador/Tutorias/TabProceso";
import FrmBuzon from "./FrmBuzon";



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

                <TabProceso  procesos={this.state.procesos} />



            </div>
        );
    }

}
export default BuzonSugerencias;

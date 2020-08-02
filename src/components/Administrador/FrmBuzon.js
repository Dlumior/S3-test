import React, { Component } from "react";
import JMaterialTableSpanishSSJ from "jinssj-mat-table-spanish-noeditable";
import { GET } from "../../Conexion/Controller";



class FrmBuzon extends Component {

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
        };



    };


    async componentDidMount() {
        let arregloDeSesiones = await GET ({ servicio: "/api/sugerencia/" });
        if (!arregloDeSesiones.sugerencias) return;

        ////console.log("arreglo: ", arregloDeSesiones);
        let arreglillo = [];
        let cont = 0;

        if (arregloDeSesiones) {
            console.log(">>Col=>",arregloDeSesiones);
            for (let element of arregloDeSesiones.sugerencias) {
                cont++;
                arreglillo.push({
                    campoCont: cont,
                    sugerencia: element.SUGERENCIA,

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
                    title: "Sugerencias Recibidas",
                    field: "sugerencia",
                },


            ],
            data: arreglillo
        };

        this.setState({ sesiones: data });

    }


    render() {
        return (
            <div>
                <JMaterialTableSpanishSSJ
                    columns={this.state.sesiones.columns}
                    data={this.state.sesiones.data}
                    title={`Lista de sugerencias al ${new Date()}`}
                    exportar
                />


            </div>
        );
    }

}
export default FrmBuzon;

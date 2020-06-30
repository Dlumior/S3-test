import React from "react";
import MaterialTable from "material-table";

function Tabla(props) {
    const arr2 = [];
    const titulosColumnas = [];
    let i = 1;
    let valeria = props.estado;


    /** ESTADOS DE UNA CITA SEGUN BACK
     * 00-realizada con cita
     * 01-realizada sin cita
     * 02-cancelada
     * 03-pospuesta (reprogramada)
     * 04-futura (pendients)
     */


    if (valeria === "PyR") { //<-- Pendiente y Reprogrmadas
        props.sesiones.columns.forEach(element => {
            if (element.title !== "Encuesta") { titulosColumnas.push(element); }
        });
    }
    else if (valeria === "Cancelada") {
        props.sesiones.columns.forEach(element => {
            if (element.title !== "Cancelar Cita" && element.title !== "Encuesta" &&
                element.title !== "Estado" && element.title !== "Reprogramar Cita"
            ) { titulosColumnas.push(element); }
        });
    }
    else { //Realizadas  igual no entra aca porque se usa el formulario: TablaTutoresMisCitas.js(jenn)
        // props.sesiones.columns.forEach(element => {
        //   if (element.title !== "Cancelar Cita") { titulosColumnas.push(element); }
        // });
    }


    // else if(valeria==="Reprogramada"){
    //   props.sesiones.columns.forEach(element => {
    //     //if(element.title!=="CANCELAR CITA"&&element.title!=="ENCUESTA"){titulosColumnas.push(element);}

    //     //Para el caso que siendo reprogramada-> sí puede cancelar una cita
    //     if(element.title!=="ENCUESTA"){titulosColumnas.push(element);}
    //   }); 
    // }


    props.sesiones.data.forEach(element => {

        // if(element.campoEstado===props.estado){       
        //   element.campoCont=i;
        //   arr2.push(element);
        //   i++;
        // }




        if (props.estado === "PyR") {
            if (element.campoEstado === "Pendiente" || element.campoEstado === "Reprogramada") {
                element.campoCont = i;

                arr2.push(element);
                i++;
            }
        } else if (props.estado === "Cancelada") { //"Cancelada"
            element.campoCont = i;

            arr2.push(element);
            i++;
        } else {
            //element.campoCont = i;
        }

    });



    return (
        <MaterialTable

            title=""
            columns={titulosColumnas}
            data={arr2}

            options={{
                rowStyle: {
                    //backgroundColor: '#E0E0E0FF',
                    backgroundColor: '#FFF',
                },
                headerStyle: {
                    backgroundColor: '#3AAFA9',
                    color: '#FFF',
                    fontSize: 20
                },
            }}
        />
    );
}
export default Tabla;
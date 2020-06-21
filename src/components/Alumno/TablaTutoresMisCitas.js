import React from "react";
import MaterialTable from "material-table";

function Tabla(props) {
    const arr2=[];
    const titulosColumnas=[];
    let i=1;
    //let valeria = props.estado==="Pendiente";
    let valeria = props.estado;
    
    if(valeria ==="Pendiente"){
      props.sesiones.columns.forEach(element => {
        if(element.title!=="ENCUESTA"){titulosColumnas.push(element);}
      });      
    }
    else if(valeria==="Reprogramada"){
      props.sesiones.columns.forEach(element => {
        //if(element.title!=="CANCELAR CITA"&&element.title!=="ENCUESTA"){titulosColumnas.push(element);}

        //Para el caso que siendo reprogramada-> sí puede cancelar una cita
        if(element.title!=="ENCUESTA"){titulosColumnas.push(element);}
      }); 
    }
    else{ //Realizadas
      props.sesiones.columns.forEach(element => {
        if(element.title!=="CANCELAR CITA"){titulosColumnas.push(element);}
      }); 
    }


    // if(valeria){
    //   props.sesiones.columns.forEach(element => {titulosColumnas.push(element)})     
    // } else{ //Resto : Reprog y Realizada
    //   props.sesiones.columns.forEach(element => {     
    //     if(element.title!=="CANCELAR CITA"){
    //         titulosColumnas.push(element);          
    //     }
  
    //   })
    // }


    //console.log("titulos columnas >> ",titulosColumnas);

   

    props.sesiones.data.forEach(element => {
      //console.log("tutores DATA ",element.campoEstado)
      //console.log("element ",element);
      //console.log("PROPS ",props);
      
      if(element.campoEstado===props.estado){       
        element.campoCont=i;
        arr2.push(element);
        i++;
      }
    });

    //console.log("AFTER daTA ",arr2);

    return (      
      <MaterialTable
        //title={props.titulo}
        //title=""
        //columns={state.columns}
        //data={state.data}

        title=""
        /*columns={props.sesiones.columns}*/  

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

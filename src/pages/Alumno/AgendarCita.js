import React from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import FrmSolicitarTutorTipoII from "../../components/Alumno/FrmSolicitarTutorTipoII.js";

const titulo = "Selección de Tutor";
const AgendarCita = () =>{
    return (
        <div>
            <NombrePrincipal titulo={titulo} />
            {/*Aca habria una especia de if para ver que formulario abrir
            de acuerdo al tipo de tutoria 
            <FormSolicitarTuror tipo = idTipo... +o->
            */}

            <FrmSolicitarTutorTipoII
            //Tipo II : tutoria INDIVIDUAL, tutor FIJO y SELECCIONADO
            />
            
        </div>
    );
};
export default AgendarCita;


















import React,{ Component, useEffect,useState } from "react";
import NombrePrincipal from "../../components/Shared/NombrePrincipal";
import { GET } from "../../Conexion/Controller";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import ConfigurarInstitucion from "../../components/Administrador/Institucion/ConfigurarInstitucion";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

const Institucion = (props) => {

  const [institucion, setInstitucion] = useState({
    "institucion": {
      ID_INSTITUCION:"1",
      NOMBRE: "",
      INICIALES: "",
      IMAGEN: "",
      TELEFONO: "",
      PAGINA_WEB: "",
      DOMINIO: "",
      UBICACION: "",
      EXTENSION: "png"
  }
  });

  useEffect(() => {
    async function fetchData() {
      const endpoint = "/api/institucion/";
      console.log(endpoint);
      const params = { servicio: endpoint };
      const res = await GET(params);
      if (res!=null){
          institucion.institucion.NOMBRE=res.institucion.NOMBRE;
          institucion.institucion.INICIALES=res.institucion.INICIALES;
          institucion.institucion.IMAGEN=res.institucion.IMAGEN;
          institucion.institucion.PAGINA_WEB=res.institucion.PAGINA_WEB;
          institucion.institucion.DOMINIO=res.institucion.DOMINIO;
          institucion.institucion.UBICACION=res.institucion.NOMBRE;
          institucion.institucion.EXTENSION=res.institucion.EXTENSION;
    
          console.log("res.inst",res.institucion);
          setInstitucion({
            ...institucion,
          });
          
          console.log(institucion);
        }
        console.log("inst",institucion);
        if (institucion !== "") {
          fetchData();
        }
      }
  }, []);
  
  return (  
    <div>
      <NombrePrincipal titulo="Configuracion de la Institución" />
      
      <ConfigurarInstitucion institucion={institucion}/>}
    </div>
  );
};

export default compose(withRouter)(Institucion);

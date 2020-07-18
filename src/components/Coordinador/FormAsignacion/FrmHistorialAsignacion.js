import React,{useState,useEffect} from "react";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import { Grid} from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
import ComboBoxPrograma from "../FormRegistroTutor/comboBoxProgramas";
import ComboBoxFacus from "../RegistrarCoordPrograma/ComboBoxFacus";
import ComboBoxProcesoTutoria from "./ComboBoxProcesoTutoria";
import ListaAsignaciones from "./ListaAsignaciones";


const style = {
    paper: {
      marginTop: "3%",
      marginLeft: "3%",
      marginRight:"3%",
      display: "flex",
      flexDirection: "row",
      alignItems: "left",
      backgroundImage: "",
    },
    paper2: {
      marginTop: "1%",
      marginLeft: "3%",
      marginRight:"3%",
      display: "flex",
      flexDirection: "row",
      alignItems: "left",
      backgroundImage: "",
    }
  };
const FrmHistorialAsignacion = () => {
  //Line 37:8:   'datosForm' is assigned a value but never used
  //Line 37:19:  'setDatosForm' is assigned a value but never used 
const [datosForm, setDatosForm] = React.useState({
    usuarioCodigo:0,
    usuarioNombre:'',
});
const [facultades, setFacultades] = useState([]);
const [facultad, setFacultad] = useState("");
const [programas, setProgramas] = useState([]);
const [programa, setPrograma] = useState("");  
const [procesosTutoria, setProcesosTutoria] = useState([]);
const [procesoTutoria, setProcesoTutoria] = useState("");

//faultades por coordinador de prog o facu
useEffect(() => {
  async function fetchData() {
      console.log("cpp",getUser().rol );
    if(getUser().rol === "Coordinador Facultad"){
      const endpoint = "/api/facultad/coordinador/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("facultades:", res);
      if (res){
        setFacultades(res.facultades);
      }      
      console.log("facultad:", facultades);
    }else{
      const endpoint = "/api/facultad/lista/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("ENTREE:", res);
      if (res){
        setFacultades(res.facultades);
      }      
      console.log("facultades:", facultades);
    }
  }
   fetchData();
}, {});

//programas a partir de un coordinador de Facultad
//Line 73:4:   React Hook useEffect was passed a dependency list that is not an array literal. This means we can't statically verify whether you've passed the correct dependencies  react-hooks/exhaustive-deps    
//Line 73:4:   React Hook useEffect has a missing dependency: 'facultades'. Either include it or remove the dependency array
useEffect(() => {
  async function fetchData() {
      if (getUser().rol ==="Coordinador Programa"){
          const endpoint = "/api/programa/lista/"+getUser().usuario.ID_USUARIO+"/"+facultad;
          const params = { servicio: endpoint };
          const res = await GET(params);    
          console.log("proogramasss:", res);
          if (res){
            setProgramas(res.programas);
          }          
          console.log("proograma:", programa);
      }else{
          const endpoint = "/api/programa/lista/"+facultad;
          const params = { servicio: endpoint };
          const res = await GET(params);    
          console.log("proogramasss:", res);
          if (res){
            setProgramas(res.programa);
          }          
          console.log("proograma:", programa);
      }
  }     
  if (facultad!==""){
      fetchData();
  }
},[facultad]);
//Line 101:3:  React Hook useEffect has a missing dependency: 'programa'. Either include it or remove the dependency array
//Line 101:3:  React Hook useEffect has a missing dependency: 'programa'. Either include it or remove the dependency array
//Line 73:4:   React Hook useEffect has a missing dependency: 'facultades'. Either include it or remove the dependency array 
//proceso de tutoria a partir de un programa
useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/tutoriafijaasignada/"+programa;
    const params = { servicio: endpoint };
    const res = await GET(params);
    console.log("tutoria: ",res);
    if (res !== []) {
      setProcesosTutoria(res.tutoria);
    }
  }
  if (facultad!=="" && programa !== "") {
    //Line 117:3:  React Hook useEffect has a missing dependency: 'facultad'. Either include it or remove the dependency array
    fetchData();
  }
},[programa]);


  return (
      <div>
        <Grid container md={12} style={style.paper2}>
          <Grid item md={3}>
              <ComboBoxFacus
                  facultades={facultades}
                  facultad={facultad}
                  setFacultad={setFacultad}
              /> 
          </Grid>
          <Grid item md={2} style={{marginRight:"5%"}}>
              <ComboBoxPrograma
                  programas={programas}
                  programa={programa}
                  setPrograma={setPrograma}
              />
          </Grid>
          <Grid item md={3}>
            <ComboBoxProcesoTutoria
                procesosTutoria={procesosTutoria}
                procesoTutoria={procesoTutoria}
                setProcesoTutoria={setProcesoTutoria}
              />
          </Grid>
        </Grid>
        {/*<Paper elevation={0} style={style.paper}>
            Tabla Tutores por proceso de tutoria
          </Paper> */}
        <ListaAsignaciones idTutoria={procesoTutoria}/>        
      </div>
  );
}

export default FrmHistorialAsignacion;


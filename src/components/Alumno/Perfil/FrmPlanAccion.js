import React,{useState,useEffect} from "react";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import { Grid, Button} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText} from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";

import ComboBoxPrograma from "../../Coordinador/FormRegistroTutor/comboBoxProgramas";
import ComboBoxProcesoTutoria from "../../Coordinador/FormAsignacion/ComboBoxProcesoTutoria";
import ListadoPlanDeAccion from "./ListadoPlanDeAccion";

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
const FrmPlanAccion = (props) => {
const [datosForm, setDatosForm] = React.useState({
    usuarioCodigo:0,
    usuarioNombre:'',
});
const [programas, setProgramas] = useState([]);
const [programa, setPrograma] = useState("");  
const [procesosTutoria, setProcesosTutoria] = useState([]);
const [procesoTutoria, setProcesoTutoria] = useState("");



//programas a partir de un tutor
useEffect(() => {
  async function fetchData() {
    if (getUser().rol==="Alumno"){
      const endpoint = "/api/programa/alumno/"+getUser().usuario.ID_USUARIO;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("proogramasss:", res);
      if (res.programas!==[]){
        setProgramas(res.programas);
        console.log("proograma:", programa);
      }
    }else{
      const endpoint = "/api/programa/alumno/"+props.idAlumno;
      const params = { servicio: endpoint };
      const res = await GET(params);    
      console.log("proogramasss:", res);
      if (res.programas!==[]){
        setProgramas(res.programas);
        console.log("proograma:", programa);
      }

    }
    
  }
  fetchData();
},{});

//proceso de tutoria a partir de un programa
useEffect(() => {
  async function fetchData() {
    const endpoint = "/api/tutoria/lista/"+programa;
    const params = { servicio: endpoint };
    const res = await GET(params);
    console.log("tutoria: ",res);
    if (res !== []) {
      setProcesosTutoria(res.tutoria);
    }
  }
  if (programa !== "") {
    fetchData();
  }
},[programa]);

return (
      <div>
        <Grid container md={12} style={style.paper2}>
          <Grid item md={3} style={{marginRight:"6%"}}>
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
          <Grid item justify="flex-end" style={{marginTop: "1%",marginLeft: "7%"}}>
          {getUser().rol==="Tutor" &&
          <Button
              disabled={procesoTutoria===""} 
              variant="contained"
              color="primary">
              Guardar
          </Button>}
        </Grid>
        </Grid>
        <Paper elevation={0} style={style.paper}>
            <ListadoPlanDeAccion 
              idAlumno={getUser().rol==="Alumno" ? getUser().usuario.ID_USUARIO: props.idAlumno} 
              idTutoria={procesoTutoria}/>
        </Paper>        
      </div>
  );
}

export default FrmPlanAccion;


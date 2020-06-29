import React,{useState,useEffect} from "react";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import { Grid} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Paper,FormControl, FormHelperText} from "@material-ui/core";
import { getUser } from "../../../Sesion/Sesion";
/*
import ComboBoxPrograma from "../FormRegistroTutor/comboBoxProgramas";
import ComboBoxFacus from "../RegistrarCoordPrograma/ComboBoxFacus";
import ComboBoxProcesoTutoria from "./ComboBoxProcesoTutoria";
*/

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
const FrmPlanAccion = () => {
const [datosForm, setDatosForm] = React.useState({
    usuarioCodigo:0,
    usuarioNombre:'',
});
const [programas, setProgramas] = useState([]);
const [programa, setPrograma] = useState("");  
const [procesosTutoria, setProcesosTutoria] = useState([]);
const [procesoTutoria, setProcesoTutoria] = useState("");

//AYUDA
/*/programas a partir de un coordinador de Facultad
useEffect(() => {
  async function fetchData() {
  const endpoint = "/api/programa/lista/"+facultad;
  const params = { servicio: endpoint };
  const res = await GET(params);    
  console.log("proogramasss:", res);
  setProgramas(res.programa);
  console.log("proograma:", programa);
  }
  if (facultad!==""){
  fetchData();
  }
},[facultad]);

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
  if (facultad!=="" && programa !== "") {
    fetchData();
  }
},[programa]);

*/
  return (
      <div>
        {/*<Grid container md={12} style={style.paper2}>
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
  </Grid>*/}
        <Paper elevation={0} style={style.paper}>
            TPlan de Accion filtrado por proceso de tutoria
        </Paper>
        
      </div>
  );
}

export default FrmPlanAccion;


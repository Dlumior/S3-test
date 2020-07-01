import React,{useState, useEffect} from "react";
import * as Conexion from "../../../Conexion/Controller";
//import useFetchData from "../../Conexion/useFetchData";
import { GET } from "../../../Conexion/Controller";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { Grid, Paper, makeStyles,Typography, Checkbox } from "@material-ui/core";

const style = {
    paper: {
      marginTop: "4%",
      marginLeft: "4%",
      marginRight: "4%",
      marginBottom: "5%",
      flexDirection: "row",
      alignItems: "center",
      backgroundImage: "",
    },
    paperitem: {
        marginTop: "2%",
        marginLeft: "4%",
      },
      foto: {
        marginTop: "2%",
        marginLeft: "4%",
        marginTop: "4%",
        flexDirection: "row",
        alignItems: "center",
        backgroundImage: "",
      }
  };
    
const ListadoPlanDeAccion = (props) => {
    const { idAlumno, idTutoria } = props;
    const [plan,setPlan]=useState([]);
    //compromisos de un alumno en un proceso de ttoria
    useEffect(() => {
        async function fetchData() {
        const endpoint = "/api/listaCompromisosAlumnoProcesoTutoria/"+idAlumno+"/"+idTutoria;
        const params = { servicio: endpoint };
        const res = await GET(params);    
        console.log("compromisos:", res);
        if (res.compromisos!==[]){
          setPlan(res.compromisos);
          console.log("compromisos:", plan);
        }  
        }
        if (idTutoria!=="" && idAlumno!==""){
            fetchData();
        }
      },[idTutoria]);
    
    const handleToggle = (item) => () => {
      console.log("idprog");
      
      
    };

    return (
      <>
        <Grid item md={12}
            container
            justify="flex-start" >    
            <br></br>              
            {plan.map((item) => (  
                <Grid>
                  {console.log("item",item)}
                  {/*<Checkbox color="primary" id={"condfe"}     
                    checked={item.ESTADO===1}>               
                  </Checkbox>*/}
                  <Checkbox
                      edge="end"
                      color="primary"
                      defaultChecked={item.ESTADO===1}
                      onChange={handleToggle(item)}                   
                  />
                  <TextField margin="dense" style={{ width: 300 }}
                    aria-readonly
                    id={"confe"}
                    defaultValue={item.DESCRIPCION}>
                  </TextField>     
                </Grid>        
                 
            ))}
        </Grid>
      </>
    );
  };
  
  export default ListadoPlanDeAccion;
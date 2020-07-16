import React,{useState} from "react";
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
    
const ModificarPlanDeAccion = (props) => {
    console.log("PLAN DE ACCION: ", props);
    const { plan, setPlan } = props;
    console.log("plantest", plan);
    console.log("CANT COMPROMISOS: ", plan.length);
    const [cantCompromisos, setCantCompromisos]=useState(plan.length);
    const [compromiso,setCompromiso]=useState({
        indice:0,
        campo:'',
        check:false, 
    });
    
    const handleCompromiso = (e,cantCom) => {
      for (let i=0; i<100; i++) {
        console.log("BABA: ", document.getElementById(i));
        if (document.getElementById(i) === null) {
          break;
        }
        document.getElementById(i).value = e.target.value.substring(0,50);
      }
      console.log("comp",e.target.value);
      setCompromiso({
        ...compromiso,
        indice:cantCom,
        campo: e.target.value,
      });
      console.log("compromise",compromiso);
      console.log("cantComp",cantCompromisos);
      if (cantCompromisos>0){
        for (let i=0;i<cantCompromisos;i++){
            if(i===cantCom){
              plan[cantCom].DESCRIPCION=e.target.value;
            }
          }
      }else{
          plan.push(compromiso);
      }
      console.log("a ver: ",plan)
      console.log("cantComp: ",cantCom)
    }; 

    const handleCantCompromisos = (func) => {
        if (func>0){
          if (func>cantCompromisos){
            setCantCompromisos(cantCompromisos => func);
            plan.push(compromiso);
            console.log("plan",plan);
          }else{
            setCantCompromisos(cantCompromisos => func);
            plan.splice(-1);
            console.log("plan",plan);
          }
          
        }else{
          setCantCompromisos(cantCompromisos => 0);
        }
    };
  
  const  keyPress = (e) =>{
      if(e.keyCode === 13 && compromiso.indice==cantCompromisos-1){
        console.log("entra?",plan);
        console.log("entra?",cantCompromisos);

        //setCantCompromisos(cantCompromisos => cantCompromisos+1)
        handleCantCompromisos(cantCompromisos+1);
        setPlan(plan);
         // put the login here
      }
   }
    const renderCompromisos = (plan) => {
        console.log("cant=",cantCompromisos);
        let n=cantCompromisos;
        let arregloPlan=[];
        for (let i of plan){
          arregloPlan.push(i);
          //programasSeleccionados.push(programa);
        }
          return(
            <div>
              {arregloPlan.map((item,index) => (  
                <Grid>
                  {item.DESCRIPCION!=='' &&
                      <Checkbox color="primary" id={cantCompromisos}>                     
                    </Checkbox>}
                  {item.DESCRIPCION!=='' &&
                  <TextField margin="dense" style={{ width: 300 }}
                    id={cantCompromisos}
                    defaultValue={item.DESCRIPCION}
                    onChange={(e) => handleCompromiso(e,index)}
                    onKeyDown={keyPress}>
                  </TextField> }
    
                </Grid>          
                 
            ))}
    
            </div> 
        );    
    }
  
    return (
      <>
        <Grid item md={12} justify="center" >
            <Paper elevation={0} style={style.paperitem}>
                <Typography variant="h6">
                    Plan de Acción
                </Typography>
            </Paper>
        </Grid>
        <Grid item md={12}
            container
            justify="flex-start" >
            {cantCompromisos===0 &&
            <Checkbox color="primary" id={cantCompromisos}>                     
            </Checkbox>}
            {cantCompromisos===0 &&
                <TextField margin="dense" style={{ width: 300 }}
            id={cantCompromisos}
            onChange={(e) => handleCompromiso(e,0)}
            onKeyDown={keyPress}>
            </TextField>}
            {/*<IconButton color="primary" onClick={()=> handleCantCompromisos(cantCompromisos+1)}>
            <AddBoxRoundedIcon
            color="primary"
            fontsize="large" />
            </IconButton> 
            <IconButton color="primary" onClick={()=> handleCantCompromisos(cantCompromisos-1)}>
            <IndeterminateCheckBoxRoundedIcon
            color="primary"
            fontsize="large" />
          </IconButton> 
            <br></br> */}                
            {cantCompromisos>0 ? renderCompromisos(plan): null} 
        </Grid>
      </>
    );
  };
  
  export default ModificarPlanDeAccion;